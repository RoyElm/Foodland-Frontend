import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html'
})
export class ContactUsComponent {

    constructor(public dialogRef: MatDialogRef<ContactUsComponent>) { }

    //closing the dialog
    public onNoClick(): void {
        this.dialogRef.close();
    }

}
