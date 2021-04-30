import { ProductModel } from "../models/product-models/product.model";

export class ProductsState {
    public products: ProductModel[] = [];

    public constructor() {
        const products = JSON.parse(sessionStorage.getItem("products"));
        if (products) {
            this.products = products;
        }
    }
}

export enum ProductsActionType {
    ProductsDownloaded = "ProductsDownloaded",
    ProductAdded = "ProductAdded",
    ProductUpdated = "ProductUpdated",
    ProductDeleted = "ProductDeleted"
}

export interface ProductsAction {
    type: ProductsActionType;
    payload?: any;
}

export function downloadedProductAction(products: ProductModel[]): ProductsAction {
    return { type: ProductsActionType.ProductsDownloaded, payload: products };
}

export function addedProductAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductAdded, payload: product };
}

export function updatedProductAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductUpdated, payload: product };
}

export function productsReducer(
    currentState: ProductsState = new ProductsState(),
    action: ProductsAction): ProductsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case ProductsActionType.ProductsDownloaded:
            newState.products = action.payload; // payload = all products
            break;

        case ProductsActionType.ProductAdded:
            newState.products.push(action.payload); // payload = the added product
            break;

        case ProductsActionType.ProductUpdated:
            const indexToUpdate = newState.products.findIndex(p => p._id == action.payload._id);
            newState.products[indexToUpdate] = action.payload; // payload = the updated product
            break;

        case ProductsActionType.ProductDeleted:
            const indexToDelete = newState.products.findIndex(p => p._id == action.payload); // payload = the deleted product's id
            newState.products.splice(indexToDelete, 1);
            break;
    }
    
    sessionStorage.setItem("products", JSON.stringify(newState.products));
    
    return newState; // Return the newState.
}
