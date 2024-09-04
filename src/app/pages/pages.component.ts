import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Location } from "@angular/common";

import { SidenavComponent } from "../components/sidenav/sidenav.component";
import { UserdetailsService } from '../services';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';

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
export class PagesComponent {
    private router = inject(Router);

    private location = inject(Location);

    private userDetailsService = inject(UserdetailsService);

    public toggle: boolean = false;

    public navLinks = [
        {
            title: 'Home',
            icon: 'fa-home',
            link: '/dashboard/home',
            isActive: false,
        },
        {
            title: 'Bill',
            icon: 'fa-money-bill',
            link: '/dashboard/bills',
            isActive: false,
        },
    ];

    public toggleSideNavWidth() {
        this.toggle = !this.toggle;
    }

    public goBack() {
        this.location.back();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if(this.router.url.includes('/dashboard/home')) {
                    this.userDetailsService.requestRefresh();
                }
            }
        })
    }

    public handleSignOut() {
        sessionStorage.removeItem('otp');
        this.router.navigate(['/auth/login']);
    }
}
