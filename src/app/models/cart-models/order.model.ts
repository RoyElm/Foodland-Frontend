export class OrderModel {
    public _id: string;
    public userId: string;
    public shoppingCartId: string;
    public totalPrice: number;
    public cityToDeliver: string;
    public addressToDeliver: string;
    public dateToDeliver: string;
    public orderDate: string = new Date().toString();
    public lastFourDigit: string;
}
