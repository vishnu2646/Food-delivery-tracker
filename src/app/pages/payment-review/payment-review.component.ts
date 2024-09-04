import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './payment-review.component.html',
    styleUrl: './payment-review.component.css'
})
export class PaymentReviewComponent {
    private router = inject(Router);

    public togglePaymentTemplate: boolean = false;

    public selectedMode: String = 'Cash';

    @Output()
    public togglePayment = new EventEmitter<void>();

    @Input()
    public updateBill: any;

    @Input()
    public status: String = '';

    public togglePaymentModeTemplate() {
        this.togglePaymentTemplate = !this.togglePaymentTemplate;
    }

    public onPaymentSubmit() {
        this.updateBill.status = this.status; 
        this.togglePayment.emit();
        console.log('Payment', this.updateBill)
        // this.router.navigate(['/dashboard/bills']);
    }
}
