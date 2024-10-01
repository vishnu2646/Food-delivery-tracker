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
            title: 'View Orders',
            link: '/dashboard/admin/customer-orders'
        }
    ];

    public handleNavigation(link: String) {
        this.router.navigate([`${link}`])
    }
}
