import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
    private router = inject(Router);

    @Input()
    public navLinks: any[] = [];

    @Output() 
    public linkClicked = new EventEmitter<void>();

    public onLinkClick(link: any) {
        this.linkClicked.emit();
        this.navLinks.forEach(link => link.isActive = false);
        link.isActive = true;
    }

    public handleSignOut() {
        sessionStorage.removeItem('otp');
        sessionStorage.removeItem('selectedCustomer');
        if (this.router.url.includes('/dashboard/delivery/')) {
            this.router.navigate(['/auth/delivery-login']);
        } else if (this.router.url.includes('/dashboard/admin/')) {
            this.router.navigate(['/auth/admin-login']);
        } else {
            this.router.navigate(['/auth/login']);
        }
    }
}
