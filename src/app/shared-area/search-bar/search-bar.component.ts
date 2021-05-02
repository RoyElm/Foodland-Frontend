import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
    public productNameValue: string;

    //handling output for "Father" Element;
    @Output()
    public productToSearch = new EventEmitter<string>();

    //handling search output the string;
    public searchProduct(): void {
        this.productToSearch.emit(this.productNameValue);
    }

    //clearing the search input and output empty string;
    public clear(): void {
        this.productNameValue = '';
        this.productToSearch.emit(this.productNameValue);
    }

}
