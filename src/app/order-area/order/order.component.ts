import { paths } from './../../../environments/paths.environment';
import { ShoppingCartService } from '../../services/market-services/shopping-cart.service';
import { AuthService } from '../../services/global-services/auth.service';
import { NotificationService } from '../../services/global-services/notification.service';
import { ShoppingCartModel } from './../../models/cart-models/shopping-cart.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public shoppingCart: ShoppingCartModel;

    public constructor(
        private shoppingCartService: ShoppingCartService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private router: Router
    ) { }

    public async ngOnInit(): Promise<void> {
        try {
            //check if shopping cart exist and if it isn't empty;
            this.shoppingCart = await this.shoppingCartService.getShoppingCartAsync();
            if (!this.shoppingCart || !this.shoppingCart.open || !store.getState().cartItemState.cartItems.length) {
                this.router.navigateByUrl(paths.marketUrl);
                this.notificationService.error("Nothing in shopping cart please start shopping");
            };
        } catch (error) {
            this.notificationService.error(error);
            if (error.status === 403) {
                this.authService.logout();
                this.router.navigateByUrl(paths.homeUrl);
            }
        }
    }

}
