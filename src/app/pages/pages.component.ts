import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { SidenavComponent } from "../components/sidenav/sidenav.component";
import { NavigationType } from '../types';
import { BackhandlerComponent } from "../components/backhandler/backhandler.component";

@Component({
    selector: 'app-pages',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        SidenavComponent,
        BackhandlerComponent
    ],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.css'
})
export class PagesComponent implements AfterViewInit {
    private router = inject(Router);

    public cd = inject(ChangeDetectorRef);

    public toggle: boolean = false;

    public navLinks: any = [];

    public loggedInData: any;

    public ngAfterViewInit(): void {
        if(this.router.url.includes(NavigationType.Customer)) {
            this.navLinks = [
                {
                    title: 'Home',
                    icon: 'fa-home',
                    link: '/dashboard/customer',
                    isActive: false,
                },
                {
                    title: 'Menu',
                    icon: 'fa-list',
                    link: '/dashboard/customer/menulist',
                    isActive: false,
                },
                {
                    title: 'Your Orders',
                    icon: 'fa-receipt',
                    link: '/dashboard/customer/order',
                    isActive: false,
                }
            ]
        } else if(this.router.url.includes(NavigationType.Admin)) {
            this.navLinks = [
                {
                    title: 'Home',
                    icon: 'fa-home',
                    link: '/dashboard/admin',
                    isActive: false,
                },
                {
                    title: 'Orders List',
                    icon: 'fa-list',
                    link: '/dashboard/admin/orders',
                    isActive: false,
                }
            ]
        } else {
            this.navLinks = [
                {
                    title: 'Home',
                    icon: 'fa-home',
                    link: '/dashboard/delivery/home',
                    isActive: false,
                },
                {
                    title: 'Bill',
                    icon: 'fa-money-bill',
                    link: '/dashboard/delivery/bills',
                    isActive: false,
                },
            ]
        }
        const userData = sessionStorage.getItem('otp');

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInData = parsedUserData;
        }
        
        this.cd.detectChanges();
    }

    public toggleSideNavWidth() {
        this.toggle = !this.toggle;
    }

    public handleHomeRouting() {
        if (this.router.url.includes('dashboard/delivery')) {
            this.router.navigate(['/dashboard/delivery/home']);
        } else if (this.router.url.includes('dashboard/admin')) {
            this.router.navigate(['/dashboard/admin']);
        } else {
            this.router.navigate(['/auth/login']);
        }
    }

    public handleSignOut() {
        sessionStorage.removeItem('otp');
        sessionStorage.removeItem('selectedCustomer');
        if (this.router.url.includes('dashboard/delivery')) {
            this.router.navigate(['/auth/delivery-login']);
        } else if (this.router.url.includes('dashboard/admin')) {
            this.router.navigate(['/auth/admin-login']);
        } else {
            this.router.navigate(['/auth/login']);
        }
    }
}
