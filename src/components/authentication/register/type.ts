export interface IRegisterPage
{
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    password:string;
    confirmPassword: string;
}

export interface IRegisterError
{
    email: string[],
    password: string[],
    confirmPassword: string[],
    image:string[]
}