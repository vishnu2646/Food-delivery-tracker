import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent } from "../../../components/carousel/carousel.component";
import { ProductComponent } from '../../../components/product/product.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CarouselComponent,
        ProductComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    private router = inject(Router);

    public heroCarosel = [
        {
            id: 1,
            img: "https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-1.jpg",
            isActive: true,
        },
        {
            id: 2,
            img: "https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-3.jpg",
            isActive: false,
        },
        {
            id: 3,
            img: "https://fooddesk.dexignlab.com/xhtml/images/banner-img/pic-4.jpg",
            isActive: false,
        }
    ];

    public category = [
        {
            id: 1,
            img: "../../assets/images/customer/category-1.jpg",
            title: 'Breakfast'
        },
        {
            id: 2,
            img: "../../assets/images/customer/category-3.jpg",
            title: 'Lunch'
        },
        {
            id: 3,
            img: "../../assets/images/customer/category-2.jpg",
            title: 'Dinner'
        },
    ];

    public todaySplMenu = [
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/pic-3.jpg',
            name: 'Cheese Burger',
            price: '100',
            isSelected: false,
            category: 'Breakfast'
        },
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/pic-1.jpg',
            name: 'Vegan Pizza',
            price: '300',
            isSelected: false,
            category: 'Lunch'
        },
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/pic-2.jpg',
            name: 'Fish Burger',
            price: '400',
            isSelected: false,
            category: 'Dinner'
        },
    ]

    public handleNativate(type: String) {

        this.router.navigate(['/dashboard/customer/menulist'], { queryParams: { type: type } });
    }

    public handleNavigateToCheckout() {
        this.router.navigate(['/dashboard/customer/checkout'])
    }
}
