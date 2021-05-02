import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { CartItemsService } from '../../services/market-services/cart-items.service';
import { environment } from '../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { NotificationService } from 'src/app/services/global-services/notification.service';

@Component({
    selector: 'app-cart-card',
    templateUrl: './cart-card.component.html',
    styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {
    @Input()
    public cartItem: CartItemModel;

    @Input()
    public enableChanges: boolean;

    public imageUrl: string;

    public constructor(
        private cartItemsService: CartItemsService,
        private notificationService: NotificationService,
        private tokenHandlerService:TokenHandlerService) { }

    public ngOnInit(): void {
        //getting product images from server;
        this.imageUrl = environment.productsUrl + "productImages/" + this.cartItem.product.imageName;
    }

    //handling plus quantity change from user;
    public plus(): void {
        this.cartItem.quantity++;
        this.cartItem.totalPrice = this.cartItem.quantity * this.cartItem.product.price;
        this.cartItemsService.updateCartItemAsync(this.cartItem);

    }

    //handling minus quantity change from user;
    public minus(): void {
        this.cartItem.quantity--;
        this.cartItem.totalPrice = this.cartItem.quantity * this.cartItem.product.price;
        this.cartItemsService.updateCartItemAsync(this.cartItem);
    }

    //handling delete specific cart item;
    public async deleteCartItem(): Promise<void> {
        try {
            await this.cartItemsService.deleteCartItemAsync(this.cartItem._id);
        } catch (error) {
            this.notificationService.error(error);
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }
}
