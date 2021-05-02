import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../../models/product-models/product.model';
import { downloadedProductAction } from '../../redux/products-state';
import store from '../../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    public constructor(private httpClient: HttpClient) { }

    //get all products;
    public async getAllProducts(): Promise<ProductModel[]> {
        if (!store.getState().productsState.products.length) {
            const products = await this.httpClient.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(downloadedProductAction(products));
        }
        return store.getState().productsState.products;
    }

}
