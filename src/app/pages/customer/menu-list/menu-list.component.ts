import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductComponent } from '../../../components/product/product.component';

@Component({
    selector: 'app-menu-list',
    standalone: true,
    imports: [
        ProductComponent
    ],
    templateUrl: './menu-list.component.html',
    styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
    private activatedRouter = inject(ActivatedRoute);

    private router = inject(Router);

    public menuType: String = '';

    public menuList = [
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
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/pic-4.jpg',
            name: 'Beef Burger',
            price: '500',
            isSelected: false,
            category: 'Breakfast'
        },
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/review-img/pic-1.jpg',
            name: 'Double Burger',
            price: '340',
            isSelected: false,
            category: 'Lunch'
        },
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/review-img/pic-2.jpg',
            name: 'Pepperoni Pizza',
            price: '120',
            isSelected: false,
            category: 'Dinner'
        },
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/review-img/pic-4.jpg',
            name: 'Japanese Ramen',
            price: '150',
            isSelected: false,
            category: 'Breakfast'
        },
        {
            img: 'https://fooddesk.dexignlab.com/xhtml/images/popular-img/review-img/pic-3.jpg',
            name: 'Fried Rice',
            price: '113',
            isSelected: false,
            category: 'Lunch'
        }
    ];

    public list = [...this.menuList];

    public ngOnInit(): void {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });

        this.activatedRouter.queryParams.subscribe(params => {
            const menuType = params['type'];
            this.menuType = menuType;
            if(menuType === undefined) {
                this.menuList = [...this.list]
            } else {
                this.menuList = this.menuList.filter(item => item.category === this.menuType);
            }
        });
    }

    public handlePlaceOrder() {
        this.router.navigate(['/dashboard/customer/checkout']);
    }
}
