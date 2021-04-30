import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ProductModel } from 'src/app/models/product-models/product.model';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-admin-side-control',
    templateUrl: './admin-side-control.component.html',
    styleUrls: ['./admin-side-control.component.css']
})
export class AdminSideControlComponent implements OnInit {
    public unSubscribeFromStore: Unsubscribe;
    public productToEdit: ProductModel = store.getState().adminProductState.product;

    public ngOnInit(): void {
        //subscribe to store for any further changes in products
        this.unSubscribeFromStore = store.subscribe(() => {
            this.productToEdit = store.getState().adminProductState.product;
        })
    }

    //destroy the subscribe after exit the component for using less memory
    public ngOnDestroy(): void {
        if (this.unSubscribeFromStore)
            this.unSubscribeFromStore();
    }

}
