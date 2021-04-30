import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Cities } from 'src/app/helpers/cities-data';

@Component({
    selector: 'app-address-details-form',
    templateUrl: './address-details-form.component.html',
    styleUrls: ['./address-details-form.component.css']
})
export class AddressDetailsFormComponent implements OnInit {

    public cities = Cities;
    public secondFormGroup: FormGroup;
    public subForm: FormGroup;

    public constructor(
        private _formBuilder: FormBuilder,
        private ctrlContainer: FormGroupDirective) { }

    public ngOnInit(): void {
        //using form builder service to specify the form elements
        this.subForm = this._formBuilder.group({
            city: ['', Validators.required],
            address: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });

        //adding control to the "father" form group
        //element to access it from "father" component;
        this.secondFormGroup = this.ctrlContainer.form;
        this.secondFormGroup.addControl("addressForm", this.subForm);
    }

    //handling error messages;
    public errorMessage(input: string): string {
        const inputControl: FormControl = (this.subForm.get(input) as FormControl);
        if (inputControl.hasError('required')) return `${input} is required`;
        if (inputControl.hasError('minlength')) return 'Min length is 2';
        if (inputControl.hasError('pattern') && input === "firstName") return "Name isn't right please follow the syntax for example: Ugi";
        if (inputControl.hasError('pattern') && input === "lastName") return "Last name isn't right please follow the syntax for example: Fletzet";
        if (inputControl.hasError('pattern') && input === "address") return "Address is not right please check double spaces or don't start with number";
        return '';
    }
}
