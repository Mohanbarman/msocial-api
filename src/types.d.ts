type RegisterUserInputType = {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    confirmPassword: String,
    email: String,
}

type UserType = {
    firstName: string,
    lastName: string,
    profilePicture: string,
    email: string,
    createdAt?: string,
    updatedAt?: string,
}