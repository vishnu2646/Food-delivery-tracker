import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

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
        this.router.navigate(['/auth/login']);
    }
}
