type RegisterUserInputType = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
}

type PostInputType = {
    body: string,
    username: string,
}

type UserType = {
    firstName: string,
    lastName: string,
    profilePicture: string,
    email: string,
    createdAt?: string,
    updatedAt?: string,
}