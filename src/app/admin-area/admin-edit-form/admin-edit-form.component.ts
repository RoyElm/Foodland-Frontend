import { TokenHandlerService } from './../../services/global-services/token-handler.service';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../services/admin-services/admin.service';
import { NotificationService } from '../../services/global-services/notification.service';
import { CategoriesService } from '../../services/market-services/categories.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/product-models/category.model';
import { ProductModel } from 'src/app/models/product-models/product.model';
import store from 'src/app/redux/store';
import { adminPanelProductAddAction } from 'src/app/redux/admin-state';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-admin-edit-form',
    templateUrl: './admin-edit-form.component.html',
    styleUrls: ['./admin-edit-form.component.css']
})
export class AdminEditFormComponent implements OnInit, OnChanges {
    @Input()
    public product: ProductModel;

    public ProductForm: FormGroup;
    public categories: CategoryModel[];
    public preview: string;
    public formSubmitted = false;


    public constructor(private _formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private notificationService: NotificationService,
        private tokenHandlerService:TokenHandlerService,
        private adminService: AdminService) { }

    public async ngOnInit(): Promise<void> {
        try {
            //getting categories using service.
            this.categories = await this.categoriesService.getAllCategoriesAsync();
        } catch (error) {
            this.notificationService.error(error);
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

    public ngOnChanges(): void {
        //validation for form and create a form builder.
        this.ProductForm = this._formBuilder.group({
            _id: [this.product._id],
            name: [this.product.name, Validators.required],
            price: [this.product.price, [Validators.required, Validators.min(0.4), Validators.max(1000)]],
            categoryId: [this.product.categoryId, Validators.required],
            newImage: [''],
            imageName: [this.product.imageName]
        });
        this.preview = environment.productsUrl + "productImages/" + this.product.imageName;
    }

    //function to handle image change and show it at preview
    public handleImage(image: Event): void {
        if ((image.target as HTMLInputElement).files[0]) {
            const file = (event.target as HTMLInputElement).files[0];
            this.ProductForm.patchValue({ newImage: file });
            this.ProductForm.get('newImage').updateValueAndValidity();
            const reader = new FileReader();
            reader.onload = () => {
                this.preview = reader.result.toString();
            };
            reader.readAsDataURL(file);
        }
    }

    //function to update the product;
    public async updateProduct(): Promise<void> {
        try {
            this.formSubmitted = true;
            if (this.ProductForm.valid) {
                await this.adminService.updateProductAsync(this.ProductForm.value);
            }
        } catch (error) {
            this.notificationService.error(error);
            //if statement for getting from server token is over
            if (error.status === 403) {
                this.tokenHandlerService.tokenSessionExpired();
            }
        }
    }

    //function to clean the redux for show the add-product-form;
    public backToAddProduct(): void {
        store.dispatch(adminPanelProductAddAction());
    }

    //error message handler;
    public errorMessage(input: string): string {
        const inputControl: FormControl = (this.ProductForm.get(input) as FormControl);
        if (inputControl.hasError('required')) return `${input} is required`;
        if (inputControl.hasError('minlength')) return 'Minimum length is 2';
        if (inputControl.hasError('pattern')) return `Example for pattern Ice Milk Or Ice-Milk`;
        if (inputControl.hasError('maxlength')) return 'Maximum length is 25';
        if (inputControl.hasError('min')) return 'Minimum Price is 0.4';
        if (inputControl.hasError('max')) return 'Maximum Price is 1000';
        return '';
    }


}
