import UserModel from '../../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const registerUser = async (parent: any, { registerInput }: { registerInput: RegisterUserInputType }, context: any, info: any) => {
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

    const res:any = await user.save();

    const jwtToken = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username,
    }, `${process.env['SECRET_KEY']}`, { expiresIn: "1h" });

    return {
        ...res._doc,
        token: jwtToken,
    };
}

export default registerUser;