import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedAreaModule } from '../shared-area/shared-area.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { MarketComponent } from './market/market.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: "", component: MarketComponent }
]

@NgModule({
    declarations: [
        MarketComponent,
        ProductsListComponent,
        ProductCardComponent,
    ],
    imports: [
        CommonModule,
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
export class MarketAreaModule { }
