import { ProductModel } from "../models/product-models/product.model";

export class AdminPanelState {
    public product: ProductModel = null;
}

export enum AdminPanelActionType {
    AdminAddProduct = "AdminAddProduct",
    AdminProductUpdated = "AdminProductUpdated"
}

export interface AdminPanelAction {
    type: AdminPanelActionType;
    payload?: any;
}

export function adminPanelProductAddAction(): AdminPanelAction {
    return { type: AdminPanelActionType.AdminAddProduct };
}

export function adminUpdatedProductAction(product: ProductModel): AdminPanelAction {
    return { type: AdminPanelActionType.AdminProductUpdated, payload: product };
}

export function adminPanelReducer(
    currentState: AdminPanelState = new AdminPanelState(),
    action: AdminPanelAction): AdminPanelState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {

        case AdminPanelActionType.AdminAddProduct:
            newState.product = null; // payload = the added product
            break;

        case AdminPanelActionType.AdminProductUpdated:
            newState.product = action.payload; // payload = the updated product
            break;
    }

    return newState; // Return the newState.
}
