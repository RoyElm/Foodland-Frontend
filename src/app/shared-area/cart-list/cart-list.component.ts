import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { NotificationService } from './../../services/global-services/notification.service';
import { CartItemsService } from '../../services/market-services/cart-items.service';
import { Component, Input, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { Unsubscribe } from 'redux';
import { paths } from 'src/environments/paths.environment';
import { ShoppingCartModel } from 'src/app/models/cart-models/shopping-cart.model';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
    @Input()
    public shoppingCart: ShoppingCartModel;

    //handling if "Father" Element want to hidden specific components;
    @Input()
    public enableChanges: boolean;

    public paths = paths;
    public unSubscribeFromStore: Unsubscribe;
    public cartItems: CartItemModel[];
    public totalPrice = 0;
    public totalQuantity = 0;
    public deleteCart = false;

    public constructor(
        private cartItemsService: CartItemsService,
        private notificationService: NotificationService,
        private tokenHandlerService: TokenHandlerService) { }

    public ngOnInit(): void {
        //checking if shoppingCart Exist and get cart items from store;
        if (this.shoppingCart.open) {
            this.cartItems = store.getState().cartItemState.cartItems;
            this.totalPrice = this.cartItemsService.getTotalPrice();
            this.totalQuantity = this.cartItemsService.getTotalQuantity();
        }

        //subscribing for any store changes;
        this.unSubscribeFromStore = store.subscribe(() => {
            this.cartItems = store.getState().cartItemState.cartItems;
            this.totalPrice = this.cartItemsService.getTotalPrice();
            this.totalQuantity = this.cartItemsService.getTotalQuantity();
        })
    }

    //handling search products in cart list (will active only in order component);
    public searchProduct(name: string): void {
        this.cartItems.map(p => {
            if (name.length && p.product.name.toLowerCase().includes(name.toLowerCase())) {
                p.background = { background: 'yellow' }
            } else {
                p.background = { background: 'white' }
            }
        });
    }

    //handling delete all cart items from shopping cart;
    public async deleteCartAsync(): Promise<void> {
        try {
            await this.cartItemsService.deleteAllCartItemsAsync();
            this.deleteCart = false;
        } catch (error) {
            this.notificationService.error(error);
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

    //cancel the subscribe to avoid any memory leak; 
    public ngOnDestroy(): void {
        if (this.cartItems) {
            this.cartItems.map(p => { p.background = { background: 'white' } });
        }
        if (this.unSubscribeFromStore)
            this.unSubscribeFromStore();
    }


}
