import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { ShoppingCartService } from '../../services/market-services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartModel } from 'src/app/models/cart-models/shopping-cart.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import store from '../../redux/store';
import { resetCartItemsAction } from 'src/app/redux/cart-items-state';

@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
    public shoppingCart: ShoppingCartModel;

    public constructor(
        private shoppingCartService: ShoppingCartService,
        private notificationService: NotificationService,
        private tokenHandlerService:TokenHandlerService) { }

    public async ngOnInit(): Promise<void> {
        try {
            //handling if user have shopping cart and if he doesn't have any shopping cart open;
            this.shoppingCart = await this.shoppingCartService.getShoppingCartAsync();

            if (!this.shoppingCart || !this.shoppingCart.open) {
                const newShoppingCart = new ShoppingCartModel();
                newShoppingCart.userId = store.getState().authState.user._id;
                this.shoppingCart = await this.shoppingCartService.createShoppingCart(newShoppingCart);
                store.dispatch(resetCartItemsAction());
            }
        } catch (error) {
            this.notificationService.error(error);
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

}
