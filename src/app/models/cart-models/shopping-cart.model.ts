import { CartItemModel } from "./cart-item.model";

export class ShoppingCartModel {
    public _id: string;
    public userId: string;
    public cartCreationDate: string = new Date().toString();
    public open: boolean = true;
    public cartItems:CartItemModel[] = [];
}