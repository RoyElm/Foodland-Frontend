import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { paths } from 'src/environments/paths.environment';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    public paths = paths;
    public user = store.getState().authState.user;
    public unsubscribeStore: Unsubscribe;

    public constructor(public dialog: MatDialog) { }

    public ngOnInit(): void {
        //subscribe for user change in store.
        this.unsubscribeStore = store.subscribe(() => {
            this.user = store.getState().authState.user
        })
    }

    //open contactUsComponent with dialog;
    public openDialog(): void {
        this.dialog.open(ContactUsComponent, {
            width: '250px'
        });
    }

    //cancel the subscribe to avoid any memory leak; 
    public ngOnDestroy():void {
        if (this.unsubscribeStore)
            this.unsubscribeStore();
    }

}
