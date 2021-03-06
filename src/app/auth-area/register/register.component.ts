import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/models/auth-models/auth.model';
import { AuthService } from 'src/app/services/global-services/auth.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';
import { paths } from 'src/environments/paths.environment';
import { Cities } from '../../helpers/cities-data';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewChecked {

    public userFormGroup: FormGroup;
    public addressFormGroup: FormGroup;
    public cities = Cities;
    public paths = paths;

    public constructor(private _formBuilder: FormBuilder,
        private authService: AuthService, private router: Router,
        private cd: ChangeDetectorRef,
        private notificationService: NotificationService) { }

    //Telling to the "father" element that his children have been changed
    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    public ngOnInit(): void {
        //specify that we have 2 form groups that will specify in "children" components;
        this.userFormGroup = this._formBuilder.group({});
        this.addressFormGroup = this._formBuilder.group({});
    }

    //handling register;
    public register = async (): Promise<void> => {
        try {
            delete this.userFormGroup.value["userForm"]['confirmPassword'];
            const newUser: AuthModel = { ...this.userFormGroup.value["userForm"], ...this.addressFormGroup.value["addressForm"] };
            newUser.email = newUser.email.toLowerCase();
            const registeredUser = await this.authService.registerAsync(newUser);
            this.notificationService.success(`Welcome! ${registeredUser.firstName}`)
            this.router.navigateByUrl(paths.homeUrl);
        } catch (error) {
            this.notificationService.error(error)
        }
    }
}

