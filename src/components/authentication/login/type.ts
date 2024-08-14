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
    IsLockedOut:boolean,
    birthday:Date|null; // Додано поле birthday
}