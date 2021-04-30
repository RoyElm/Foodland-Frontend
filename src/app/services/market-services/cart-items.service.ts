import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../../models/cart-models/cart-item.model';
import { addedCartItemAction, deletedCartItemAction, resetCartItemsAction, updatedCartItemAction } from '../../redux/cart-items-state';
import store from '../../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartItemsService {

    public constructor(private httpClient: HttpClient) { }

    public async addCartItemAsync(cartItem: CartItemModel): Promise<CartItemModel> {
        const addedCartItem = await this.httpClient.post<CartItemModel>(environment.cartItemsUrl, cartItem).toPromise();
        store.dispatch(addedCartItemAction(addedCartItem));
        return addedCartItem;
    }

    public async deleteCartItemAsync(_id: string): Promise<void> {
        await this.httpClient.delete<CartItemModel>(environment.cartItemsUrl + _id).toPromise();
        store.dispatch(deletedCartItemAction(_id));
    }

    public async deleteAllCartItemsAsync(): Promise<void> {
        const shoppingCartId = store.getState().shoppingCartState.shoppingCart._id;
        await this.httpClient.delete<CartItemModel>(environment.cartItemsUrl + "all/" + shoppingCartId).toPromise();
        store.dispatch(resetCartItemsAction());
    }

    public async updateCartItemAsync(cartItem: CartItemModel): Promise<CartItemModel> {
        const updatedCartItem = await this.httpClient.put<CartItemModel>(environment.cartItemsUrl + cartItem._id, cartItem).toPromise();
        store.dispatch(updatedCartItemAction(updatedCartItem));
        return updatedCartItem;
    }

    public getTotalPrice(): number {
        let totalPrice = 0;
        store.getState().cartItemState.cartItems.map(c => totalPrice += c.totalPrice);
        return totalPrice;
    }

    public getTotalQuantity(): number {
        let quantity = 0;
        store.getState().cartItemState.cartItems.map(c => quantity += c.quantity);
        return quantity;
    }

}
