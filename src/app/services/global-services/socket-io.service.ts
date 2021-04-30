import { NotificationService } from './notification.service';
import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from '../../redux/store';
import { addedProductAction, updatedProductAction } from '../../redux/products-state';
import { ProductModel } from '../../models/product-models/product.model';
import { CartItemModel } from 'src/app/models/cart-models/cart-item.model';
import { updatedCartItemAction } from 'src/app/redux/cart-items-state';

@Injectable({
    providedIn: 'root'
})
export class SocketIoService {

    private socket: Socket;
    public constructor(private notificationService:NotificationService) { }
    public connect(): void {
        // Connect to socket.io:
        this.socket = io(environment.socketIoUrl);
        // Listen to socket.io events: 
        this.socket.on("msg-from-server-product-added", (addedProduct: ProductModel) => {
            store.dispatch(addedProductAction(addedProduct));
            this.notificationService.success("New Product in store! " + addedProduct.name)
        });
        this.socket.on("msg-from-server-product-updated", (updatedProduct: ProductModel) => {
            store.dispatch(updatedProductAction(updatedProduct));
            this.notificationService.success("Product has been updated! " + updatedProduct.name);

        });

        this.socket.on("msg-from-server-cart-item-updated", (cartItem: CartItemModel) => {
            store.dispatch(updatedCartItemAction(cartItem));
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

