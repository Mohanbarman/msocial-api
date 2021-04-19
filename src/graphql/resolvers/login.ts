import { UserInputError, ValidationError } from "apollo-server-errors";
import bcrypt from 'bcrypt';

import { validateLoginInput } from "../../utils/validators";
import UserModel from '../../models/user';
import createToken from '../../utils/createToken';

const login = async (parent: any, input: { email: string, password: string }) => {
    // validate email and password
    const { errors, valid } = validateLoginInput(input.email, input.password);
    if (!valid) throw new UserInputError("Errors", { errors });

    // throw an error if user with this email doesn't exists
    const user = await UserModel.findOne({ email: input.email }).exec();
    if (!user) throw new ValidationError("Invalid credentials");

    // checking if password is correct
    const isPasswordCorrect = await bcrypt.compare(input.password, user.password);
    if (!isPasswordCorrect) throw new ValidationError("Invalid credentials");

    const token = createToken(user.id, user.email, user.username);

    return { user, token };
}

export default login;