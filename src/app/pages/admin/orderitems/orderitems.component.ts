import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../Form/form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
    selector: 'app-orderitems',
    standalone: true,
    imports: [
        FormComponent,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './orderitems.component.html',
    styleUrl: './orderitems.component.css'
})
export class OrderitemsComponent implements OnInit {
    private router = inject(Router);

    private orderService = inject(OrderService);

    public submitType: String = '';

    public viewAddItem: boolean = false;

    public orderItems: any;

    public ngOnInit(): void {
        this.fetchOrderDetails();
    }

    public fetchOrderDetails() {
        this.orderItems = this.orderService.getOrderData();
        console.log(this.orderItems);
    }

    public getOrderDetails(event: FocusEvent) {
        const element = event.target as HTMLInputElement;
        const phoneNumber = element.value;
        console.log(phoneNumber);
    }

    public handlenavigateToOrderForm(): void {
        // this.router.navigate(['/dashboard/admin/order/form'], { queryParams: {type: this.submitType} });
    }
}
