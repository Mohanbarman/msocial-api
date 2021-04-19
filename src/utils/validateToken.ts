import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';

const validateToken = (token: string): { id: string, username: string, email: string, expiresAt: number } => {
    if (!token) throw new Error("authorization header is required");
    try {
        const user: any = jwt.verify(token, process.env['JWT_SECRET'] as string);
        return {
            id: user.id as string,
            email: user.email as string,
            expiresAt: user.expiresAt as number,
            username: user.username as string,
        };
    } catch (e) {
        throw new AuthenticationError("Invalid token");
    }
}

export default validateToken;