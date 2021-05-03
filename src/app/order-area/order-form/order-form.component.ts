import { OrderService } from './../../services/market-services/order.service';
import { CartItemsService } from './../../services/market-services/cart-items.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cities } from './../../helpers/cities-data';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/cart-models/order.model';
import { FinalOrderDialogComponent } from '../final-order-dialog/final-order-dialog.component';
import { DateFilterFn } from '@angular/material/datepicker';
import store from '../../redux/store';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { TokenHandlerService } from 'src/app/services/global-services/token-handler.service';
import { AuthModel } from 'src/app/models/auth-models/auth.model';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

    public newOrder = new OrderModel();
    public cities = Cities;
    public currentDate: Date;
    public maxDate: Date;
    public filterUsedDates: DateFilterFn<Date>;
    public user: AuthModel = store.getState().authState.user;

    public constructor(public dialog: MatDialog,
        private cartItemsService: CartItemsService,
        private notificationService: NotificationService,
        private tokenHandlerService: TokenHandlerService,
        private orderService: OrderService
    ) {
        //handling newOrder variables;
        this.newOrder.shoppingCartId = store.getState().shoppingCartState.shoppingCart._id;
        this.newOrder.userId = this.user._id;
        this.newOrder.addressToDeliver = this.user.address;
        this.newOrder.cityToDeliver = this.user.city;
    }

    public async ngOnInit(): Promise<void> {
        try {
            //handle date Picker min and get dateArray to prevent specific dates to show up;
            this.currentDate = new Date();
            this.maxDate = new Date(2030, 0, 0);

            const dateArray = await this.getDateArray();
            this.filterUsedDates = (date: Date): boolean => {
                const dateNow = (date || new Date()).toLocaleDateString();
                const count = this.getDateCount(dateArray, dateNow);
                // Prevent 3 orders to be in same day.
                return count < 3
            }
        } catch (error) {
            this.notificationService.error(error);
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

    //counting how many times specific date is showing up;
    private getDateCount(dateArray: string[], date: string): number {
        let count = 0;
        dateArray.forEach(v => v === date && count++);
        return count;
    }

    //getting ALL Orders from service and creating dateArray with orders dates;
    private getDateArray = async (): Promise<string[]> => {
        try {
            const dateArray: string[] = [];
            const orders = await this.orderService.getAllOrdersAsync();
            orders.map(o => dateArray.push(new Date(o.dateToDeliver).toLocaleDateString()))
            return dateArray;
        } catch (error) {
            this.notificationService.error(error);
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
            return [];
        }
    }

    //handling order form and opening finalOrderDialogComponent as dialog with newOrder Data;
    public order(): void {
        this.newOrder.totalPrice = this.cartItemsService.getTotalPrice();
        const dateToDeliver = new Date(this.newOrder.dateToDeliver).toLocaleDateString();
        const lastFourDigit = this.newOrder.lastFourDigit.substr(this.newOrder.lastFourDigit.length - 4);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            ...this.newOrder,
            dateToDeliver,
            lastFourDigit
        };
        this.dialog.open(FinalOrderDialogComponent, dialogConfig);
    }

}
