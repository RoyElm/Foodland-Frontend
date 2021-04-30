import { CartItemsService } from '../../services/market-services/cart-items.service';
import { environment } from '../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';

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

    public constructor(private cartItemsService: CartItemsService) { }

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
    public deleteCartItem(): void {
        this.cartItemsService.deleteCartItemAsync(this.cartItem._id);
    }
}
