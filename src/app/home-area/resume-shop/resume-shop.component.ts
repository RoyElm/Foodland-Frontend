import { ShoppingCartService } from '../../services/market-services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartModel } from 'src/app/models/cart-models/shopping-cart.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { paths } from 'src/environments/paths.environment';
import { AuthModel } from 'src/app/models/auth-models/auth.model';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-resume-shop',
    templateUrl: './resume-shop.component.html',
    styleUrls: ['./resume-shop.component.css']
})
export class ResumeShopComponent implements OnInit {

    @Input()
    public user: AuthModel;
    public paths = paths;

    public shoppingCart: ShoppingCartModel;

    public constructor(
        private notificationService: NotificationService,
        private shoppingCartService: ShoppingCartService) { }

    public async ngOnInit(): Promise<void> {
        try {
            if(this.user.role !== "Admin-Role"){
                //getting shopping cart from service.
                this.shoppingCart = await this.shoppingCartService.getShoppingCartAsync();
            }
        } catch (error) {
            this.notificationService.error(error)
        }
    }

    //if user don't have shopping cart, creating new one.
    public async createShoppingCart(): Promise<void> {
        this.shoppingCart = new ShoppingCartModel();
        this.shoppingCart.userId = store.getState().authState.user._id;
        this.shoppingCart = await this.shoppingCartService.createShoppingCart(this.shoppingCart);
    }


}
