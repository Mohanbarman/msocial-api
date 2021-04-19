import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../../models/user';
import { AuthenticationError } from 'apollo-server-errors';

const getToken = async (parent: any, { email, password }: { email: string, password: string }, context: any, info: any) => {
    const user = await UserModel.findOne({ email: email }).exec();
    if (user === null) throw new AuthenticationError("User not found with this email");

    const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new AuthenticationError("Wrong password");

    const jwtToken = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, process.env['JWT_SECRET'] as string, { expiresIn: "1h" });

    return { token: jwtToken }
};

export default getToken;