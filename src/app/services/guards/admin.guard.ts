import { paths } from '../../../environments/paths.environment';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../../redux/store';
import { NotificationService } from '../global-services/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {


    public constructor(private notificationService: NotificationService, private router: Router) { }

    //blocking normal user to access admin pages;
    public canActivate(): boolean {
        const user = store.getState().authState.user;
        if (user && user.role === "Admin-Role") return true;
        
        if (!user)
            this.notificationService.error("You are not logged in!");
        else
            this.notificationService.error("You don't authorized to access that page!!");

        this.router.navigateByUrl(paths.homeUrl);
        return false;
    }

}
