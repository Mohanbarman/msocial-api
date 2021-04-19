import jwt from 'jsonwebtoken';

const createToken = (id: string, email: string, username: string) => {
    const jwtToken = jwt.sign({ id, email, username }, `${process.env['SECRET_KEY']}`, { expiresIn: "1h" });
    return jwtToken;
}

export default createToken;