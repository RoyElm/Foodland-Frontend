import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../../models/cart-models/order.model';
import { ShoppingCartModel } from '../../models/cart-models/shopping-cart.model';
import store from '../../redux/store';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public constructor(private httpClient: HttpClient) { }

    public async sendOrderAsync(order: OrderModel): Promise<OrderModel> {
        const ordered = await this.httpClient.post<OrderModel>(environment.orderUrl, order).toPromise();
        const shoppingCart = store.getState().shoppingCartState.shoppingCart;
        shoppingCart.open = false;
        await this.httpClient.put<ShoppingCartModel>(environment.shoppingCartUrl + "close/" + shoppingCart._id, shoppingCart).toPromise();
        return ordered;
    }

    public getAllOrdersAsync(): Promise<OrderModel[]> {
        return this.httpClient.get<OrderModel[]>(environment.orderUrl).toPromise();
    }

    public downloadReceiptAsync(orderId: string): Observable<Blob> {
        return this.httpClient.get(environment.orderUrl + "receipt/" + orderId, {
            responseType: 'blob'
        })
    }
}
