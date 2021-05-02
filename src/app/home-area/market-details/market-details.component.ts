import { CartItemsService } from './../../services/market-services/cart-items.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { AuthModel } from 'src/app/models/auth-models/auth.model';
import store from 'src/app/redux/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-market-details',
    templateUrl: './market-details.component.html',
    styleUrls: ['./market-details.component.css']
})
export class MarketDetailsComponent implements OnInit {
    @Input()
    public user: AuthModel;

    public countProducts = 0;
    public countOrders = 0;
    public totalPrice = 0;
    public shoppingCart = store.getState().shoppingCartState.shoppingCart;
    public unsubscribeStore: Unsubscribe;

    constructor(
        private httpClient: HttpClient,
        private notificationService: NotificationService,
        private cartItemsService: CartItemsService) { }

    public async ngOnInit(): Promise<void> {
        try {
            //getting from server how many products and orders have;
            this.countProducts = await this.httpClient.get<number>(environment.productsUrl + "totalProduct").toPromise();
            this.countOrders = await this.httpClient.get<number>(environment.orderUrl + "totalOrders").toPromise();
            this.totalPrice = this.cartItemsService.getTotalPrice();
            
            //handling shopping cart change in store;
            this.unsubscribeStore = store.subscribe(() => {
                this.shoppingCart = store.getState().shoppingCartState.shoppingCart;
                this.totalPrice = this.cartItemsService.getTotalPrice();
            })
        } catch (error) {
            this.notificationService.error(error);
        }
    }

    //cancel the subscribe to avoid any memory leak; 
    public ngOnDestroy(): void {
        if (this.unsubscribeStore)
            this.unsubscribeStore();
    }

}
