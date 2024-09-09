export interface ICartItem
{
    id:number,
    counter:number
}

const initState: ICartItem[] =[];

export enum FavoriteActionType {
    ADD_BASKET = "ADD_ITEM_PRODUCT",
    DELETE_BASKET="DEL_ITEM_PRODUCT"
}

export const basketSlice = (state=initState, action: any): ICartItem[] => {
    switch(action.type)
    {
        case FavoriteActionType.ADD_BASKET: {
            console.log("Payload", action.payload);
            return [...action.payload];
        }
    }

    return state;
}

export default basketSlice;