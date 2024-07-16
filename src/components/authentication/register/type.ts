export interface IRegisterPage
{
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    image:string;
    password:string;
    birthday: Date | null;
}

export interface IRegisterError
{
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    image?:string
}