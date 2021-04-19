import { ValidationError } from 'apollo-server-errors';
import UserModel from '../../models/user';


const validateUser = async (parent: any, { username, email }: { username: string | undefined, email: string | undefined }, context: any, info: any) => {
    if (username) {
        const dupUsernameUser = await UserModel.findOne({ username }).exec();
        if (dupUsernameUser) return false;
    }
    if (email) {
        const dupEmailUser = await UserModel.findOne({ email }).exec();
        if (dupEmailUser) return false;
    }

    return true;
}

export default validateUser;