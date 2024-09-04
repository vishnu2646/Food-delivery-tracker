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
        console.log("work");
        this.visible = false;
        this.router.navigate(['/auth/login']);
    }
}
