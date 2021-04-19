import bcrypt from 'bcrypt';
import { UserInputError, ValidationError } from 'apollo-server-errors';

import UserModel from '../../models/user';
import { validateRegisterInput } from '../../utils/validators';
import createToken from '../../utils/createToken';


const registerUser = async (parent: any, { registerInput }: { registerInput: RegisterUserInputType }, context: any, info: any) => {
    // validating user email, username, password
    const { valid, errors } = validateRegisterInput(registerInput.email, registerInput.username, registerInput.password);
    if (!valid) throw new UserInputError('RegisterInput contain errors', { errors });

    // checking of email and username already exists in the database
    const dupEmail = await UserModel.findOne({ email: registerInput.email }).exec();
    const dupUsername = await UserModel.findOne({ username: registerInput.username }).exec();

    if (dupEmail && dupUsername) throw new ValidationError("Username and email already taken");
    if (dupEmail) throw new ValidationError("Email already taken");
    if (dupUsername) throw new ValidationError("Username already taken");

    // registration process starts from here
    // Hashing password with 12 rounds
    const password = await bcrypt.hash(registerInput.password, 12);

    // creating user model with input data
    const user = new UserModel({
        firstName: registerInput.firstName,
        lastName: registerInput.lastName,
        username: registerInput.username,
        email: registerInput.email,
        password: password,
        updatedAt: new Date().toISOString(),
    })

    // add user to mongodb collection or throw an error if any exception occurs
    try { await user.save() }
    catch (e) { throw new ValidationError(e) }

    // generating jwt token
    const token = createToken(user.id, user.email, user.username);

    return { user, token };
}

export default registerUser;