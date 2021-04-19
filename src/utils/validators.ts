export const validateRegisterInput = (email: string, username: string, password: string): { errors: {}, valid: boolean } => {
    const errors: any = {};

    if (!isEmailValid(email)) errors.email = "Email is invalid";
    if (!username.trim()) errors.username = "Username must not be empty";
    if (!password.trim()) errors.password = "Password must not be empty";
    if (!email.trim()) errors.email = "Email must not be empty"

    return { errors, valid: Object.keys(errors).length < 1 };
}

export const validateLoginInput = (email: string, password: string): { valid: boolean, errors: {} } => {
    const errors: any = {};

    if (!email.trim()) errors.email = "Email must not be empty";
    else if (!isEmailValid(email)) errors.email = "Email is not valid";
    if (!password.trim()) errors.password = "Password must not be empty";

    return { errors, valid: Object.keys(errors).length < 1 }
}

export const isEmailValid = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
