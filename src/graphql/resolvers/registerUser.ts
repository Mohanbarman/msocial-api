import UserModel from '../../models/user';
import bcrypt from 'bcrypt';
import { validateRegisterInput } from '../../utils/validators';
import { UserInputError, ValidationError } from 'apollo-server-errors';


const registerUser = async (parent: any, { registerInput }: { registerInput: RegisterUserInputType }, context: any, info: any) => {
    // validating user email and username
    const { valid, errors } = validateRegisterInput(registerInput.email, registerInput.username, registerInput.password);
    if (!valid) throw new UserInputError('RegisterInput contain errors', { errors });

    const dupEmail = await UserModel.findOne({ email: registerInput.email }).exec();
    const dupUsername = await UserModel.findOne({ username: registerInput.username }).exec();

    if (dupEmail && dupUsername) throw new ValidationError("Username and email already taken");
    if (dupEmail) throw new ValidationError("Email already taken");
    if (dupUsername) throw new ValidationError("Username already taken");

    // Hashing password with 12 rounds
    const password = await bcrypt.hash(registerInput.password, 12);

    const user = new UserModel({
        firstName: registerInput.firstName,
        lastName: registerInput.lastName,
        username: registerInput.username,
        email: registerInput.email,
        password: password,
        updatedAt: new Date().toISOString(),
    })

    const res: any = await user.save();

    return user;
}

export default registerUser;