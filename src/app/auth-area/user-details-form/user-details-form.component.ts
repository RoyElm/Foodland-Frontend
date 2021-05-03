import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/global-services/auth.service';
import { NotificationService } from 'src/app/services/global-services/notification.service';

@Component({
    selector: 'app-user-details-form',
    templateUrl: './user-details-form.component.html',
    styleUrls: ['./user-details-form.component.css']

})
export class UserDetailsFormComponent implements OnInit {

    public subForm: FormGroup;
    public userFormGroup: FormGroup;
    public PasswordHide = true;
    public confirmPasswordHide = true;

    public constructor(private _formBuilder: FormBuilder,
        private ctrlContainer: FormGroupDirective,
        private authService: AuthService,
        private notificationService: NotificationService) { }

    public ngOnInit(): void {
        //using form builder service to specify the form elements
        this.subForm = this._formBuilder.group({
            idCard: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', [Validators.required, Validators.pattern(this.subForm?.get('password').value)]]
        }, { asyncValidator: [async () => await this.checkIdCard(), async () => await this.checkEmail()] });

        //adding control to the "father" form group
        //element to access it from "father" component;
        this.userFormGroup = this.ctrlContainer.form;
        this.userFormGroup.addControl("userForm", this.subForm);
    }

    //function to handle not same passwords;
    public checkPasswords = (): object => {
        const password = this.subForm?.get('password').value;
        const confirmPassword = this.subForm?.get('confirmPassword').value;
        return password === confirmPassword ? null : { notSame: true }
    }

    //check if id card already exist in DB
    public checkIdCard = async (): Promise<boolean | string> => {
        try {
            const existUser = await this.authService.checkByUserIdAsync(this.subForm);
            if (existUser) return true;
            this.subForm.get("idCard").setErrors({ duplicate: "Already Exist" })
            return "false"
        } catch (error) {
            this.notificationService.error(error);
            return "false";
        }
    }

    //check if email already exist in DB
    public checkEmail = async (): Promise<boolean | string> => {
        try {
            const existUser = await this.authService.checkByEmailAsync(this.subForm);
            if (existUser) return true;
            this.subForm.get("email").setErrors({ duplicate: "Already Exist" })
            return "false";
        } catch (error) {
            this.notificationService.error(error)
            return "false";
        }
    }

    //handling error messages;
    public errorMessage(input: string): string {
        const inputControl: FormControl = (this.subForm.get(input) as FormControl);
        if (inputControl.hasError('required')) return `${input} is required`;
        if (inputControl.hasError('minlength')) return 'Min length is 6';
        if (inputControl.hasError('pattern') && input === 'confirmPassword') return 'Passwords are not the same';
        if (inputControl.hasError('pattern') && input === "idCard") return "Pattern example 025458617";
        if (inputControl.hasError('pattern')) return "required syntax Roy@gmail.com";
        if (inputControl.hasError('duplicate')) return 'Already Exist';
        return '';
    }



}
