import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/models/auth-models/auth.model';
import { AuthService } from 'src/app/services/global-services/auth.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { paths } from 'src/environments/paths.environment';

@Component({
    selector: 'app-auth-log',
    templateUrl: './auth-log.component.html',
    styleUrls: ['./auth-log.component.css']
})
export class AuthLogComponent {
    @Input()
    public user: AuthModel;

    public constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private router: Router) { }

    //handling logout user;
    public logout(): void {
        this.authService.logout();
        this.notificationService.success("You have been Logout!");
        this.router.navigateByUrl(paths.homeUrl)
    }

}
