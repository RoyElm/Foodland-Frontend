import { ShoppingCartModel } from './../../models/cart-models/shopping-cart.model';
import { Component } from '@angular/core';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent {
    public shoppingCart: ShoppingCartModel;
    public constructor() {
        this.shoppingCart = store.getState().shoppingCartState.shoppingCart;
    }
}