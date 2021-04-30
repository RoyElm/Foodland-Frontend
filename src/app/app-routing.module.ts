import { JwtInterceptor } from './services/global-services/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-area/home/home.component';
import { RegisterComponent } from './auth-area/register/register.component';
import { LoginGuard } from './services/auth-guard/login.guard';
import { Page404Component } from './layout-area/page404/page404.component';
import { AdminGuard } from './services/auth-guard/admin.guard';

const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "auth/register", component: RegisterComponent, pathMatch: "full" },
    { path: "market", canActivate: [LoginGuard], loadChildren: () => import("./market-area/market-area.module").then(m => m.MarketAreaModule), pathMatch: "full" },
    { path: "order", canActivate: [LoginGuard], loadChildren: () => import("./order-area/order-area.module").then(m => m.OrderAreaModule) },
    { path: "admin-market", canActivate: [AdminGuard], loadChildren: () => import("./admin-area/admin-area.module").then(m => m.AdminAreaModule), pathMatch: "full" },
    { path: "**", component: Page404Component, pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }],
    exports: [RouterModule]
})
export class AppRoutingModule { }
