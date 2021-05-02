import { NotificationService } from '../global-services/notification.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../../redux/store';
import { paths } from 'src/environments/paths.environment';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    public constructor(private notificationService: NotificationService, private router: Router) { }

    //blocking un logged to persons to access any pages
    public canActivate(): boolean {
        const user = store.getState().authState.user;
        if (user && user.role === "0") return true;

        if (!user)
            this.notificationService.error("You are not logged in!");
        else
            this.notificationService.error("You don't authorized to access that page!!");

        this.router.navigateByUrl(paths.homeUrl);
        return false;
    }
}
