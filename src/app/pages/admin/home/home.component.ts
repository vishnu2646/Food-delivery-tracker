import { Component, inject } from '@angular/core';
import { SharedHomeComponent } from "../../../shared/shared-home/shared-home.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        SharedHomeComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class AdminHomeComponent {
    private router = inject(Router);

    public adminOptions = [
        {
            title: 'Create Orders',
            link: '/dashboard/admin/customer-orders'
        },
        {
            title: 'View Order List',
            link: '/dashboard/admin/orders'
        },
        {
            title: 'Packing List',
            link: '/dashboard/admin/packing-form'
        }
    ];

    public handleNavigation(link: String) {
        this.router.navigate([`${link}`])
    }
}
