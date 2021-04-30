import { AdminSideControlComponent } from './admin-side-control/admin-side-control.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMarketComponent } from './admin-market/admin-market.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { AdminProductCardComponent } from './admin-product-card/admin-product-card.component';
import { AdminEditFormComponent } from './admin-edit-form/admin-edit-form.component';
import { AdminAddFormComponent } from './admin-add-form/admin-add-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedAreaModule } from '../shared-area/shared-area.module';

const routes: Routes = [
    { path: "", component: AdminMarketComponent }
]

@NgModule({
    declarations: [
        AdminMarketComponent,
        AdminProductListComponent,
        AdminProductCardComponent,
        AdminSideControlComponent,
        AdminEditFormComponent,
        AdminAddFormComponent
    ],
    imports: [
        SharedAreaModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatMenuModule,
        MatDialogModule,
        MatStepperModule,
        MatDividerModule,
        MatSidenavModule,
        MatTabsModule,
        RouterModule.forChild(routes)

    ]
})
export class AdminAreaModule { }
