import { Component, inject, Input } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [
        DialogModule,
        ButtonModule,
    ],
    templateUrl: './error.component.html',
    styleUrl: './error.component.css'
})
export class ErrorComponent {
    private router = inject(Router);

    @Input()
    public visible: boolean = false;

    @Input()
    public message: String = '';

    public toggleDialog() {
        this.visible = false;
        if (this.router.url.includes('/dashboard/delivery/')) {
            this.router.navigate(['/auth/delivery-login']);
        } else if (this.router.url.includes('/dashboard/admin/')) {
            this.router.navigate(['/auth/admin-login']);
        } else {
            this.router.navigate(['/auth/login']);
        }
    }
}
