import { CredentialsModel } from './../../models/auth-models/credentials.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/global-services/auth.service';
import { paths } from '../../../environments/paths.environment';
import { NotificationService } from '../../services/global-services/notification.service';
import { FormControl, NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public paths = paths;
    public credentials = new CredentialsModel();
    public PasswordHide = true;

    public constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router) { }

    //handling login user;
    public async login(): Promise<void> {
        try {
            this.credentials.email = this.credentials.email.toLowerCase();
            const loggedInUser = await this.authService.loginAsync(this.credentials);
            this.notificationService.success("Hello " + loggedInUser.firstName + "<br>you are now logged in");
            if (loggedInUser.role === "Admin-Role")
                this.router.navigateByUrl(paths.adminMarketUrl);
        } catch (error) {
            this.notificationService.error(error);
        }
    }

    public errorMessage(input: string, formInfo: NgForm): string {
        const inputControl: FormControl = (formInfo.control.get(input) as FormControl);
        if (inputControl?.hasError('required')) return `${input} is required`;
        if (inputControl?.hasError('minlength')) return 'Min length is 6';
        if (inputControl?.hasError('pattern')) return "required syntax Roy@gmail.com";
        return '';
    }

}
