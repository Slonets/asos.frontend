export interface ICategoryName {
    id: number,
    name: string,
}
export interface IProductCreate {
    Name: string;
    Description: string;
    CategoryId: number;
    Price: number;
    Size:number;
    Color:string;
    BrandId:number;
    SubCategoryId:number;
    Gender:number;
    AboutMe:string;
    LookAfterMe:string;
    SizeAndFit:string;
    Amount:number;
    ImageUrls: File[];
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
export interface IBrandName {
    id: number,
    name: string,
}
export interface ISizeName {
    label: string;
    value: number;
}
export interface IGenderName {
    label: string;
    value: number;
}
export interface ISubCategoryName {
    id: number;
    categoryId: number;
    name: string;
}