import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { OrderService } from './../../services/market-services/order.service';
import { NotificationService } from './../../services/global-services/notification.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { OrderModel } from 'src/app/models/cart-models/order.model';

@Component({
    selector: 'app-receipt-dialog',
    templateUrl: './receipt-dialog.component.html'
})
export class ReceiptDialogComponent {

    public constructor(
        private orderService: OrderService,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<ReceiptDialogComponent>,
        private tokenHandlerService: TokenHandlerService,
        @Inject(MAT_DIALOG_DATA) public ordered: OrderModel,
    ) { }

    //handling close dialog and routing the user to home page after finish order.
    public onNoClick(): void {
        this.dialogRef.close(this.ordered);
    }

    //handling downloading receipt;
    public downloadReceipt(): void {
        this.orderService
            .downloadReceiptAsync(this.ordered._id)
            .subscribe(blob => saveAs(blob, `${this.ordered._id}.pdf`), error => {
                if (error.status === 403) {
                    this.notificationService.error("Your login session has expired. Please login again.")
                    this.tokenHandlerService.tokenSessionExpired();
                } else {
                    this.notificationService.error(error);
                }
            }
            );
        this.dialogRef.close(this.ordered);
    }
}

