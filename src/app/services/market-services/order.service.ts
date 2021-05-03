import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../../models/cart-models/order.model';
import { ShoppingCartModel } from '../../models/cart-models/shopping-cart.model';
import store from '../../redux/store';
import { updatedShoppingCartAction } from 'src/app/redux/shopping-cart-state';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public constructor(private httpClient: HttpClient) { }

    //handling send order;
    public async sendOrderAsync(order: OrderModel): Promise<OrderModel> {
        const ordered = await this.httpClient.post<OrderModel>(environment.orderUrl, order).toPromise();
        const shoppingCart = store.getState().shoppingCartState.shoppingCart;
        shoppingCart.open = false;
        const closedShoppingCart = await this.httpClient.put<ShoppingCartModel>(environment.shoppingCartUrl + "close/" + shoppingCart._id, shoppingCart).toPromise();
        store.dispatch(updatedShoppingCartAction(closedShoppingCart));
        return ordered;
    }

    //get all orders from server.
    public getAllOrdersAsync(): Promise<OrderModel[]> {
        return this.httpClient.get<OrderModel[]>(environment.orderUrl).toPromise();
    }

    //get last order from server by user id.
    public getLastOrderByUserIdAsync(userId: string): Promise<OrderModel> {
        return this.httpClient.get<OrderModel>(environment.orderUrl + "lastOrder/" + userId).toPromise();
    }

    //handling download receipt;
    public downloadReceiptAsync(orderId: string): Observable<Blob> {
        return this.httpClient.get(environment.orderUrl + "receipt/" + orderId, {
            responseType: 'blob'
        })
    }
}
