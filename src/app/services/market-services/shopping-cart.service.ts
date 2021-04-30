import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { downloadedCartItemsAction } from 'src/app/redux/cart-items-state';
import { environment } from 'src/environments/environment';
import { ShoppingCartModel } from '../../models/cart-models/shopping-cart.model';
import { createdShoppingCartAction, downloadedShoppingCartAction } from '../../redux/shopping-cart-state';
import store from '../../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    public constructor(private httpClient: HttpClient) { }

    public async getShoppingCartAsync(): Promise<ShoppingCartModel> {
        const storeShoppingCart = store.getState().shoppingCartState.shoppingCart;
        const userId = store.getState().authState.user._id;
        if (!storeShoppingCart || userId !== storeShoppingCart.userId) {
            const shoppingCart = await this.httpClient.get<ShoppingCartModel>(environment.shoppingCartUrl + userId).toPromise();
            if(shoppingCart){
                this.downloadedCartItems(shoppingCart.cartItems);
            }
            store.dispatch(downloadedShoppingCartAction(shoppingCart))
        }
        return store.getState().shoppingCartState.shoppingCart;
    }

    public async createShoppingCart(shoppingCart: ShoppingCartModel): Promise<ShoppingCartModel> {
        const createdShoppingCart = await this.httpClient.post<ShoppingCartModel>(environment.shoppingCartUrl, shoppingCart).toPromise();
        store.dispatch(createdShoppingCartAction(createdShoppingCart))
        return createdShoppingCart;
    }

    public downloadedCartItems(cartItems: CartItemModel[]) {
        store.dispatch(downloadedCartItemsAction(cartItems));
    }
}

