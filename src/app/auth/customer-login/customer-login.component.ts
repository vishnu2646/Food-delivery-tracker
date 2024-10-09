import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-login',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './customer-login.component.html',
    styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {

    private router = inject(Router);

    public toggleFields: boolean = false;

    public toggleFormFields() {
        this.toggleFields = !this.toggleFields;
    }

    public customerLoginForm = {
        phone: '',
        otp: ''
    }

    public handleCustomerLogin() {
        this.router.navigate(['/dashboard/customer']);
    }
}
