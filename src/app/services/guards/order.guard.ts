import { NotificationService } from '../global-services/notification.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../../redux/store';
import { paths } from 'src/environments/paths.environment';
import { ShoppingCartModel } from 'src/app/models/cart-models/shopping-cart.model';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class OrderGuard implements CanActivate {
    public shoppingCart: ShoppingCartModel;
    public cartItems: CartItemModel[];

    public constructor(private notificationService: NotificationService, private router: Router) { }

    //handling block user to access Order route if she/he haven't anything in shopping cart or shopping cart or shopping cart is closed.
    public canActivate(): boolean {
        this.shoppingCart = store.getState().shoppingCartState.shoppingCart;
        this.cartItems = store.getState().cartItemState.cartItems;
        if (!this.shoppingCart || !this.shoppingCart.open || !this.cartItems.length) {
            this.notificationService.error("Nothing in shopping cart please start shopping");
            this.router.navigateByUrl(paths.marketUrl);
            return false;
        }

        return true;
    }
}
