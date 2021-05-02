import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addedProductAction, updatedProductAction } from 'src/app/redux/products-state';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../../models/product-models/product.model';
import { adminPanelProductAddAction } from '../../redux/admin-state';
import store from '../../redux/store';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    public constructor(private httpClient: HttpClient) { }

    //handling add product to market
    public async addProductAsync(product: ProductModel): Promise<void> {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("categoryId", product.categoryId.toString());
        myFormData.append("newImage", product.newImage);
        await this.httpClient.post<ProductModel>(environment.adminPanelUrl + "add-product", myFormData).toPromise();
    }

    //handling update product to market
    public async updateProductAsync(product: ProductModel): Promise<ProductModel> {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("categoryId", product.categoryId.toString());
        myFormData.append("imageName", product.imageName);
        product.newImage && myFormData.append("newImage", product.newImage);
        const updatedProduct = await this.httpClient.put<ProductModel>(environment.adminPanelUrl + "update-product/" + product._id, myFormData).toPromise();
        store.dispatch(adminPanelProductAddAction());
        return updatedProduct;
    }

}
