import { AdminService } from '../../services/admin-services/admin.service';
import { NotificationService } from '../../services/global-services/notification.service';
import { CategoriesService } from '../../services/market-services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryModel } from 'src/app/models/product-models/category.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
    selector: 'app-admin-add-form',
    templateUrl: './admin-add-form.component.html',
    styleUrls: ['./admin-add-form.component.css']
})
export class AdminAddFormComponent implements OnInit {

    @ViewChild(FormGroupDirective) public myForm: FormGroupDirective;

    public ProductForm: FormGroup;
    public categories: CategoryModel[];
    public preview: string;
    public formSubmitted = false;

    public constructor(private _formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private notificationService: NotificationService,
        private adminService: AdminService) { }

    public async ngOnInit(): Promise<void> {
        try {
            //getting categories using service.
            this.categories = await this.categoriesService.getAllCategoriesAsync();

            //validation for form
            this.ProductForm = this._formBuilder.group({
                name: ['', Validators.required],
                price: ['', [Validators.required, Validators.min(0.4), Validators.max(1000)]],
                categoryId: ['', Validators.required],
                newImage: ['', Validators.required]
            });

        } catch (error) {
            this.notificationService.error(error)
        }
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

    //function to handle add product;
    public async addProduct(): Promise<void> {
        try {
            this.formSubmitted = true;
            if (this.ProductForm.valid) {
                await this.adminService.addProductAsync(this.ProductForm.value);
                this.resetForm();
            }
        } catch (error) {
            this.notificationService.error(error)
        }
    }

    //Reset form after submit
    public resetForm = () => {
        this.formSubmitted = false;
        this.preview = '';
        this.ProductForm.reset();
        this.myForm.resetForm();
    }

    //error message handles;
    public errorMessage(input: string): string {
        const inputControl: FormControl = (this.ProductForm.get(input) as FormControl);
        if (inputControl.hasError('required')) return `${input} is required`;
        if (inputControl.hasError('pattern')) return `Example for pattern Ice Milk Or Ice-Milk`;
        if (inputControl.hasError('minlength')) return 'Minimum length is 2';
        if (inputControl.hasError('maxlength')) return 'Maximum length is 25';
        if (inputControl.hasError('min')) return 'Minimum Price is 0.4';
        if (inputControl.hasError('max')) return 'Maximum Price is 1000';
        return '';
    }

}
