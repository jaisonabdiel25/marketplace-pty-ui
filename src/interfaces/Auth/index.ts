export interface PropsFormikLogin {
    email: string;
    password: string;
}

export interface PropsFormikRegister {
    name: string;
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export interface ResponseAuth {
    data: UserInfo;
    token: string;
}

export interface UserInfo {
    id: string;
    name: string;
    firstName: string;
    email: string;
    active: boolean;
    phone: string;
    img: string;
}
