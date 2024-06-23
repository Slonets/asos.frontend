export interface ILoginPage
{
    email:string;
    password:string;
}

export interface ILoginPageError
{
    email:string[];
    password:string[];
    invalid:string;
}

export interface IUser
{
    id:number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    image:string,
    roles:string,
}