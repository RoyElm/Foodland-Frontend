import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { OrderModel } from 'src/app/models/cart-models/order.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/market-services/order.service';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';

@Component({
    selector: 'app-final-order-dialog',
    templateUrl: './final-order-dialog.component.html'
})
export class FinalOrderDialogComponent {

    public constructor(
        private notificationService: NotificationService,
        private dialogRef: MatDialogRef<FinalOrderDialogComponent>,
        private dialog: MatDialog,
        private tokenHandlerService: TokenHandlerService,
        @Inject(MAT_DIALOG_DATA) public order: OrderModel,
        private orderService: OrderService
    ) { }

    //handle dialog close;
    public onNoClick(): void {
        this.dialogRef.close();
    }

    //handle send order; and opening download receipt dialog;
    public async sendOrder(): Promise<void> {
        try {
            const ordered = await this.orderService.sendOrderAsync(this.order);
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = ordered
            this.dialogRef.close();
            this.dialog.open(ReceiptDialogComponent, dialogConfig);
        } catch (error) {
            this.notificationService.error(error);
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

}
