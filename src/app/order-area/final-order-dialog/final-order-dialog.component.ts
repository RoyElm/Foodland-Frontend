import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { OrderModel } from 'src/app/models/cart-models/order.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/market-services/order.service';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
import { Router } from '@angular/router';
import { paths } from 'src/environments/paths.environment';

@Component({
    selector: 'app-final-order-dialog',
    templateUrl: './final-order-dialog.component.html'
})
export class FinalOrderDialogComponent {

    public constructor(
        private notificationService: NotificationService,
        private dialogRef: MatDialogRef<FinalOrderDialogComponent>,
        private dialog: MatDialog,
        private router: Router,
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
            const addedOrder = await this.orderService.sendOrderAsync(this.order);
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = addedOrder;
            this.dialogRef.close();
            let receiptDialogRef = this.dialog.open(ReceiptDialogComponent, dialogConfig);
            
            //handling dialog close of receipt-dialog handling navigate to home url and show a message when it close properly;
            receiptDialogRef.afterClosed().subscribe((orderData:OrderModel) => {
                if(orderData){
                    this.notificationService.success(`${new Date(orderData.dateToDeliver).toLocaleDateString()} See you then :)`);
                }
                this.router.navigateByUrl(paths.homeUrl);
            });

        } catch (error) {
            this.notificationService.error(error);
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

}
