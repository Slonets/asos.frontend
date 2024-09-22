export interface LoginResponse {
    token: string;
    baskets?: number[]; // Масив ID продуктів у кошику
}

export interface GoogleLoginRequest {
    credential: string;
    baskets?: number[];
}

export interface ILoginPage
{
    email:string;
    password:string;
    basket:number[];
}

export interface ILoginPageError
{
    isSuccess:boolean;
    error:string;
}

export interface IValidLogin
{
    propertyName:string,
    errorMessage:string;
}

export interface IUser
{
    id:number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string,
    image:string,
    roles:string,
    birthday:string;
    lockoutEnabled:boolean
}
