import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent {

    @Input()
    public item: any;

    @Input()
    public swiperClass: String = '';
}
