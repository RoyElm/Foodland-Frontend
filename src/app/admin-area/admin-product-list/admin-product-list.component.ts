import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { ProductsService } from '../../services/market-services/products.service';
import { CategoryModel } from '../../models/product-models/category.model';
import { CategoriesService } from '../../services/market-services/categories.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-admin-product-list',
    templateUrl: './admin-product-list.component.html',
    styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

    public categories: CategoryModel[];
    public products: ProductModel[];
    public productsSwitched: ProductModel[];
    public unSubscribeFromStore: Unsubscribe;

    public constructor(private categoriesService: CategoriesService,
        private productsService: ProductsService,
        private tokenHandlerService:TokenHandlerService) { }

    public async ngOnInit(): Promise<void> {
        try {
            //getting all categories/products using services ;
            this.categories = await this.categoriesService.getAllCategoriesAsync();
            this.products = await this.productsService.getAllProducts();

            //making another variable with the same values
            //as products for future changes without effect the products;
            this.productsSwitched = [...this.products];

            //subscribe for any further changes in store.
            this.unSubscribeFromStore = store.subscribe(async () => {
                this.products = await this.productsService.getAllProducts();
                this.productsSwitched = [...this.products];
            })
        } catch (error) {
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

    //handling category change
    public changeCategory(_id: string): void {
        this.productsSwitched = this.products.filter(p => p.categoryId === _id);
    }

    //handling category change
    public allCategory(): void {
        this.productsSwitched = [...this.products];
    }

    //handling search for specify product
    public searchProduct(productName: string): void {
        this.productsSwitched = this.products.filter(p => p.name.toLowerCase().includes(productName.toLowerCase()));
    }

    //destroy the subscribe after exit the component for using less memory;
    public ngOnDestroy(): void {
        if (this.unSubscribeFromStore)
            this.unSubscribeFromStore()
    }

}
