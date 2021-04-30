import { NgModule } from '@angular/core';
import { OrderComponent } from './order/order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { FinalOrderDialogComponent } from './final-order-dialog/final-order-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { SharedAreaModule } from '../shared-area/shared-area.module';
import { ReceiptDialogComponent } from './receipt-dialog/receipt-dialog.component';

const routes: Routes = [
    { path: "", component: OrderComponent }
]

@NgModule({
    declarations: [
        OrderComponent,
        OrderFormComponent,
        FinalOrderDialogComponent,
        ReceiptDialogComponent,
    ],
    imports: [
        SharedAreaModule,
        MatDatepickerModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSidenavModule,
        MatTabsModule,
        RouterModule.forChild(routes)
    ]
})
export class OrderAreaModule { }
