export interface UserSignUp {
    name: string,
    email: string,
    password: string
}

export interface UserLogin {
    email: string,
    password: string
}

export interface UserAccountRecovering {
    email: string
}

export interface UserNewPassword {
    id_user: number,
    password: string
}