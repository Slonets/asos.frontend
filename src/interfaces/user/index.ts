
export interface User {
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
}
export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface UserState {
    location: ILocation | null;
    user: User | null;
    token: string | null;
}

export interface LoginResponse {
    token: string;
}

export interface IChangeUser {
    id:number;
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber:string,
    image: File|null
}

export interface IChangeFoto {
    id:number;
    image: File|null;
}