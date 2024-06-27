export interface ICategoryName {
    id: number,
    name: string,
}
export interface IProductCreate {
    name: string;
    description: string;
    category_id: number;
    files: File[];
}
export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}