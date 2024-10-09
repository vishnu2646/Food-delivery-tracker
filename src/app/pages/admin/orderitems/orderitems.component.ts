import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../Form/form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { ApiService, UserdetailsService } from '../../../services';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-orderitems',
    standalone: true,
    imports: [
        FormComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TableModule,
    ],
    templateUrl: './orderitems.component.html',
    styleUrl: './orderitems.component.css'
})
export class OrderitemsComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);

    private apiService = inject(ApiService);

    private userService = inject(UserdetailsService);

    public orderItems: any;

    public orderUser: any;

    public id: any;

    public orderId: any;

    public formType: String = '';

    public loggedInUserDetials: any;

    public ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.id = params['id'];
            this.formType = params['type'];
            this.orderId = params['orderId'];
        });
        this.loggedInUserDetials = this.userService.getLoginData();
        this.fetchOrderDetails();
    }

    public async fetchOrderDetails() {
        try {
            const responseData = await lastValueFrom(this.apiService.getOrderItemDetails(this.loggedInUserDetials?.username, this.id, this.formType, this.orderId));
            if(responseData){
                this.orderUser = responseData.OrderDetails.Table;
                this.orderItems = responseData.OrderDetails.Table1;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
