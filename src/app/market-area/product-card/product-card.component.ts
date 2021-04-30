import { paths } from './../../../environments/paths.environment';
import { AuthService } from 'src/app/services/global-services/auth.service';
import { NotificationService } from '../../services/global-services/notification.service';
import { CartItemModel } from '../../models/cart-models/cart-item.model';
import { CartItemsService } from '../../services/market-services/cart-items.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    @Input()
    public product: ProductModel;

    // public quantity: number = 1;
    public imageUrl: string;
    public cartItem = new CartItemModel();
    public unSubscribeFromStore: Unsubscribe;

    public constructor(
        private cartItemsService: CartItemsService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private router: Router) { }

    public async ngOnInit(): Promise<void> {
        //getting from server product image;
        this.imageUrl = environment.productsUrl + "productImages/" + this.product.imageName;

        //getting the same product from cartItemState.;
        const oldCartItem = store.getState().cartItemState.cartItems.find(c => c.productId === this.product._id);
        if (oldCartItem) this.cartItem = { ...oldCartItem };

        //subscribe for any further changes in store.
        this.unSubscribeFromStore = store.subscribe(() => {
            const oldCartItem = store.getState().cartItemState.cartItems.find(c => c.productId === this.product._id);
            if (oldCartItem) {
                this.cartItem = { ...oldCartItem };
            } else {
                this.cartItem = new CartItemModel();
            }
        })
    }

    public plus(): void {
        //plus quantity by 1, will be use in the future to add/update in shopping cart;
        this.cartItem.quantity++;
    }

    public minus(): void {
        //minus quantity by 1, will be use in the future to add/update in shopping cart;
        this.cartItem.quantity--;
    }

    //function that handle add to cart click event;
    public async addToCart(): Promise<void> {
        try {
            const newCartItem = this.createCartItem();
            const addedCartItem = await this.cartItemsService.addCartItemAsync(newCartItem);
            this.cartItem = { ...addedCartItem };
        } catch (error) {
            this.notificationService.error(error);
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.authService.logout();
                this.router.navigateByUrl(paths.homeUrl);
            }
        }
    }

    //function that handle updating old cart item;
    public async updateOldCartItem(): Promise<void> {
        try {
            this.cartItem.totalPrice = this.product.price * this.cartItem.quantity;
            await this.cartItemsService.updateCartItemAsync(this.cartItem);
        } catch (error) {
            this.notificationService.error(error);
        }
    }

    //function that handle creating cart item;
    private createCartItem(): CartItemModel {
        const newCartItem = new CartItemModel();
        newCartItem.productId = this.product._id;
        newCartItem.totalPrice = this.product.price * this.cartItem.quantity;
        newCartItem.shoppingCartId = store.getState().shoppingCartState.shoppingCart._id;
        newCartItem.product = this.product;
        newCartItem.quantity = this.cartItem.quantity;
        return newCartItem;
    }

    public ngOnDestroy() {
        if (this.unSubscribeFromStore)
            this.unSubscribeFromStore();
    }

}
