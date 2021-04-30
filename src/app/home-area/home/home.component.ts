import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public user = store.getState().authState.user;
    public unsubscribeStore: Unsubscribe;

    public ngOnInit(): void {
        //subscribe to handle user change.
        this.unsubscribeStore = store.subscribe(() => {
            this.user = store.getState().authState.user
        })
    }

    //cancel the subscribe to avoid any memory leak; 
    public ngOnDestroy(): void {
        if (this.unsubscribeStore)
            this.unsubscribeStore();
    }
}
