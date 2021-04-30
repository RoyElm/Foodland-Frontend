import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../../models/product-models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    public constructor(private httpClient: HttpClient) { }

    public async getAllCategoriesAsync(): Promise<CategoryModel[]> {
        return await this.httpClient.get<CategoryModel[]>(environment.categoriesUrl).toPromise();;
    }
}
