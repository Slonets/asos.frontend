export interface ILoginPage
{
    email:string;
    password:string;
}

export interface ILoginPageError
{
    isSuccess:boolean;
    error:string;

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
    IsLockedOut:boolean,
}