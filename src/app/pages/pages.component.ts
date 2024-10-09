import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Location } from "@angular/common";

import { SidenavComponent } from "../components/sidenav/sidenav.component";
import { UserdetailsService } from '../services';
import { NavigationType } from '../types';

@Component({
    selector: 'app-pages',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        SidenavComponent
    ],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.css'
})
export class PagesComponent implements AfterViewInit {
    private router = inject(Router);

    public cd = inject(ChangeDetectorRef);

    private location = inject(Location);

    private userDetailsService = inject(UserdetailsService);

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

    public goBack() {
        this.location.back();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if(this.router.url.includes('/dashboard/delivery/home')) {
                    this.userDetailsService.requestRefresh();
                }
            }
        })
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
