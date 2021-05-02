import { ShoppingCartModel } from "../models/cart-models/shopping-cart.model";

export class ShoppingCartState {
    public shoppingCart: ShoppingCartModel = null;

    public constructor() {
        const shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
        if (shoppingCart) {
            this.shoppingCart = shoppingCart;
        }
    }
}

export enum ShoppingCartActionType {
    ShoppingCartDownloaded = "ShoppingCartDownloaded",
    ShoppingCartUpdated = "ShoppingCartUpdated",
    ShoppingCartCreated = "ShoppingCartCreated",
    ShoppingCartReset = "ShoppingCartReset"
}

export interface ShoppingCartAction {
    type: ShoppingCartActionType;
    payload?: any;
}

export function downloadedShoppingCartAction(shoppingCart: ShoppingCartModel): ShoppingCartAction {
    return { type: ShoppingCartActionType.ShoppingCartDownloaded, payload: shoppingCart };
}

export function updatedShoppingCartAction(shoppingCart: ShoppingCartModel): ShoppingCartAction {
    return { type: ShoppingCartActionType.ShoppingCartUpdated, payload: shoppingCart };
}

export function createdShoppingCartAction(shoppingCart: ShoppingCartModel): ShoppingCartAction {
    return { type: ShoppingCartActionType.ShoppingCartCreated, payload: shoppingCart };
}

export function resetShoppingCartAction(): ShoppingCartAction {
    return { type: ShoppingCartActionType.ShoppingCartReset };
}

export function ShoppingCartReducer(
    currentState: ShoppingCartState = new ShoppingCartState(),
    action: ShoppingCartAction): ShoppingCartState {

    const newState = { ...currentState };

    switch (action.type) {
        case ShoppingCartActionType.ShoppingCartCreated:
        case ShoppingCartActionType.ShoppingCartDownloaded:
        case ShoppingCartActionType.ShoppingCartUpdated:
            newState.shoppingCart = action.payload;
            break;
        case ShoppingCartActionType.ShoppingCartReset:
            newState.shoppingCart = null;
            break;
    }

    sessionStorage.setItem("shoppingCart", JSON.stringify(newState.shoppingCart));
    return newState;
}
