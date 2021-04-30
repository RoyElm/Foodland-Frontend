import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { adminUpdatedProductAction } from 'src/app/redux/admin-state';

@Component({
    selector: 'app-admin-product-card',
    templateUrl: './admin-product-card.component.html',
    styleUrls: ['./admin-product-card.component.css']
})
export class AdminProductCardComponent implements OnInit {

    //getting product from product list;
    @Input()
    public product: ProductModel;

    public imageUrl: string;

    public async ngOnInit(): Promise<void> {
        this.imageUrl = environment.productsUrl + "productImages/" + this.product.imageName;
    }

    //function to activate admin-edit-form
    //and downloading the specify product to redux.
    public editProduct(): void {
        store.dispatch(adminUpdatedProductAction(this.product));
    }

}



