import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { Unsubscribe } from 'redux';
import { ProductsService } from '../../services/market-services/products.service';
import { CategoryModel } from '../../models/product-models/category.model';
import { CategoriesService } from '../../services/market-services/categories.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-models/product.model';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    public categories: CategoryModel[];
    public products: ProductModel[];
    public productsSwitched: ProductModel[];
    public unSubscribeFromStore: Unsubscribe;
    public handleIdChange:string;

    public constructor(
        private categoriesService: CategoriesService,
        private productsService: ProductsService,
        private tokenHandlerService:TokenHandlerService) { }

    public async ngOnInit(): Promise<void> {
        try {
            //getting products and categories from services;
            this.categories = await this.categoriesService.getAllCategoriesAsync();
            this.products = await this.productsService.getAllProducts();
            
            //creating new variable to avoid any reference type problems;
            this.productsSwitched = [...this.products];

             //subscribe for any further changes in store.
             this.unSubscribeFromStore = store.subscribe(async () => {
                this.products = await this.productsService.getAllProducts();
                //handling store change but staying in same product category;
                if(this.handleIdChange){
                    this.changeCategory(this.handleIdChange)
                }else {
                    this.productsSwitched = [...this.products];
                }
                
            })
            
        } catch (error) {
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

    //Handle click on any category section except "All".
    public changeCategory(_id: string): void {
        this.productsSwitched = [...this.products.filter(p => p.categoryId === _id)];
        this.handleIdChange = _id;
    }

    //Handle click on "All" category section.
    public allCategory(): void {
        this.productsSwitched = [...this.products];
        this.handleIdChange = undefined;
    }

    //handle search product;
    public searchProduct(productName: string): void {
        this.productsSwitched = [...this.products.filter(p => p.name.toLowerCase().includes(productName.toLowerCase()))];
    }

    public ngOnDestroy() {
        if (this.unSubscribeFromStore)
            this.unSubscribeFromStore();
    }
}
