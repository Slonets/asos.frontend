export interface ICartItem
{
    id:number,
    counter:number
}

const initState: ICartItem[] =[];

export enum FavoriteActionType {
    ADD_FAVORITE = "ADD_ITEM_PRODUCT",
    DELETE_FAVORITE="DEL_ITEM_PRODUCT"
}

export const favoriteSlice = (state=initState, action: any): ICartItem[] => {
    switch(action.type)
    {
        case FavoriteActionType.ADD_FAVORITE: {
            console.log("Payload", action.payload);
            return [...action.payload];
        }
    }

    return state;
}

export default favoriteSlice;