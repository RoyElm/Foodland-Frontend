import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout-area/layout/layout.component';
import { HeaderComponent } from './layout-area/header/header.component';
import { ContactUsComponent } from './layout-area/contact-us/contact-us.component';
import { MarketDetailsComponent } from './home-area/market-details/market-details.component';
import { HomeComponent } from './home-area/home/home.component';
import { LoginComponent } from './auth-area/login/login.component';
import { AuthLogComponent } from './auth-area/auth-log/auth-log.component';
import { ResumeShopComponent } from './home-area/resume-shop/resume-shop.component';
import { RegisterComponent } from './auth-area/register/register.component';
import { UserDetailsFormComponent } from './auth-area/user-details-form/user-details-form.component';
import { AddressDetailsFormComponent } from './auth-area/address-details-form/address-details-form.component';
import { AboutUsComponent } from './home-area/about-us/about-us.component';
import { Page404Component } from './layout-area/page404/page404.component';
import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedAreaModule } from './shared-area/shared-area.module';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        ContactUsComponent,
        HomeComponent,
        LoginComponent,
        AuthLogComponent,
        ResumeShopComponent,
        RegisterComponent,
        UserDetailsFormComponent,
        AddressDetailsFormComponent,
        MarketDetailsComponent,
        Page404Component,
        AboutUsComponent
    ],
    imports: [
        HttpClientModule,
        SharedAreaModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatMenuModule,
        MatDialogModule,
        MatStepperModule,
        MatDividerModule,
        MatSidenavModule,
        MatTabsModule
    ],
    providers: [],
    bootstrap: [LayoutComponent],
    exports: []
})
export class AppModule { }
