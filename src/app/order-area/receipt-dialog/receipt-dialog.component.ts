import { OrderService } from './../../services/market-services/order.service';
import { paths } from './../../../environments/paths.environment';
import { NotificationService } from './../../services/global-services/notification.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { OrderModel } from 'src/app/models/cart-models/order.model';

@Component({
    selector: 'app-receipt-dialog',
    templateUrl: './receipt-dialog.component.html'
})
export class ReceiptDialogComponent {

    public constructor(
        private orderService: OrderService,
        private router: Router,
        private notificationService: NotificationService,
        public dialogRef: MatDialogRef<ReceiptDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public ordered: OrderModel,
    ) { }

    //handling close dialog and routing the user to home page after finish order.
    public onNoClick(): void {
        this.dialogRef.close();
        this.notificationService.success(`${new Date(this.ordered.dateToDeliver).toLocaleDateString()} See you then :)`);
        this.router.navigateByUrl(paths.homeUrl);
    }

    //handling downloading receipt;
    public downloadReceipt(): void {
        try {
            this.orderService
                .downloadReceiptAsync(this.ordered._id)
                .subscribe(blob => saveAs(blob, `${this.ordered._id}.pdf`));

            this.dialogRef.close();
            this.notificationService.success(`${new Date(this.ordered.dateToDeliver).toLocaleDateString()} See you then :)`);
            this.router.navigateByUrl(paths.homeUrl);
        } catch (error) {
            this.notificationService.error(error)
        }
    }

}
