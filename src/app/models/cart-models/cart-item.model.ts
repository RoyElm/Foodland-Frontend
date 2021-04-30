import { ProductModel } from "../product-models/product.model";

export class CartItemModel {
    public _id: string;
    public productId: string;
    public shoppingCartId: string;
    public quantity: number = 1;
    public totalPrice: number;
    public product: ProductModel;
    public background: Object;
}