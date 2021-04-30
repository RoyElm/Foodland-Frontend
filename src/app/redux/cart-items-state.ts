import { CartItemModel } from "../models/cart-models/cart-item.model";
import { ShoppingCartModel } from "../models/cart-models/shopping-cart.model";

export class CartItemsState {
    public cartItems: CartItemModel[] = [];
    public constructor() {
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
        if (cartItems) {
            this.cartItems = cartItems;
        }
    }
}

export enum CartItemsActionType {
    CartItemsDownloaded = "CartItemsDownloaded",
    CartItemAdded = "CartItemAdded",
    CartItemUpdated = "CartItemUpdated",
    CartItemDeleted = "CartItemDeleted",
    resetCartItems = "resetCartItems"
}

export interface CartItemsAction {
    type: CartItemsActionType;
    payload?: any;
}

export function downloadedCartItemsAction(cartItems: CartItemModel[]): CartItemsAction {
    return { type: CartItemsActionType.CartItemsDownloaded, payload: cartItems };
}

export function addedCartItemAction(cartItems: CartItemModel): CartItemsAction {
    return { type: CartItemsActionType.CartItemAdded, payload: cartItems };
}

export function updatedCartItemAction(cartItems: CartItemModel): CartItemsAction {
    return { type: CartItemsActionType.CartItemUpdated, payload: cartItems };
}

export function deletedCartItemAction(_id: string): CartItemsAction {
    return { type: CartItemsActionType.CartItemDeleted, payload: _id };
}

export function resetCartItemsAction(): CartItemsAction {
    return { type: CartItemsActionType.resetCartItems };
}

// Products Reducer: 
export function cartItemsReducer(
    currentState: CartItemsState = new CartItemsState(),
    action: CartItemsAction): CartItemsState {

    const newState = { ...currentState };

    switch (action.type) {
        case CartItemsActionType.CartItemsDownloaded:
            newState.cartItems = action.payload;
            break;

        case CartItemsActionType.CartItemAdded:
            newState.cartItems.push(action.payload);
            break;

        case CartItemsActionType.CartItemUpdated:
            const indexToUpdate = newState.cartItems.findIndex(p => p._id == action.payload._id);
            newState.cartItems[indexToUpdate] = action.payload;
            break;

        case CartItemsActionType.CartItemDeleted:
            const indexToDelete = newState.cartItems.findIndex(p => p._id == action.payload);
            newState.cartItems.splice(indexToDelete, 1);
            break;
        case CartItemsActionType.resetCartItems:
            newState.cartItems = [];
            break;
    }

    sessionStorage.setItem("cartItems", JSON.stringify(newState.cartItems));

    return newState;
}
