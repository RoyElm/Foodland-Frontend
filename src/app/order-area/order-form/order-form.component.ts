import { OrderService } from './../../services/market-services/order.service';
import { CartItemsService } from './../../services/market-services/cart-items.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cities } from './../../helpers/cities-data';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/cart-models/order.model';
import { FinalOrderDialogComponent } from '../final-order-dialog/final-order-dialog.component';
import { DateFilterFn } from '@angular/material/datepicker';
import store from '../../redux/store';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
    public newOrder = new OrderModel();
    public cities = Cities;
    public currentDate: Date;
    public filterUsedDates: DateFilterFn<Date>;

    public constructor(public dialog: MatDialog,
        private cartItemsService: CartItemsService,
        private orderService: OrderService
    ) {
        //handling newOrder variables and getting them from store;
        this.newOrder.shoppingCartId = store.getState().shoppingCartState.shoppingCart._id;
        this.newOrder.userId = store.getState().authState.user._id;
        this.newOrder.addressToDeliver = store.getState().authState.user.address;
        this.newOrder.cityToDeliver = store.getState().authState.user.city;
    }

    public async ngOnInit(): Promise<void> {
        //handle date Picker min and get dateArray to prevent specific dates to show up;
        this.currentDate = new Date();
        const dateArray = await this.getDateArray();
        this.filterUsedDates = (date: Date): boolean => {
            const dateNow = (date || new Date()).toLocaleDateString();
            const count = this.getDateCount(dateArray, dateNow);
            // Prevent 3 orders to be in same day.
            return count < 3
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
        const dateArray: string[] = [];
        const orders = await this.orderService.getAllOrdersAsync();
        orders.map(o => dateArray.push(new Date(o.dateToDeliver).toLocaleDateString()))
        return dateArray;
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
