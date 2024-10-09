import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../../../services';
import { IOrdersList } from '../../../types';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule,
        DropdownModule
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

    private acrivatedRoute = inject(ActivatedRoute);

    private router = inject(Router);

    private apiService = inject(ApiService);

    private orderService = inject(OrderService);

    public hasParams: boolean = false;

    private Vid: String = '';

    private loggedInUserData: any;
    
    public type: String = 'All';

    public types: any[] = [];

    public ordersList: IOrdersList[] = [];

    public date: any = new Date();

    public ngOnInit(): void {
        this.getOrdersList();

        this.types = [
            { type: 'All', id: 'All' },
            { type: 'BreakFast', id: 'BreakFast' },
            { type: 'Lunch', id: 'Lunch' },
            { type: 'Dinner', id: 'Dinner' },
        ]
    }

    public handleUpdatedDateChange(event: any ) {
        this.date = moment(event).toDate();
        this.getOrdersList();
    }

    public handleFoodTypeChange(event: DropdownChangeEvent) {
        let value = event.value;
        this.type = value.type;
        this.getOrdersList();
    }

    public async getOrdersList(): Promise<void> {
        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInUserData = parsedUserData;
        }
        try {
            this.acrivatedRoute.queryParams.subscribe(params => {
                this.Vid = params['id'] || '';
                this.type = params['type'] || this.type;
                this.hasParams = !!params['type'];
            });
            const date = moment(this.date).format('YYYY-MM-DD');
            const responseOrders = await lastValueFrom(this.apiService.getOrdersList(this.type, this.loggedInUserData.username, date, this.Vid));
            if(responseOrders && responseOrders.AllCustomer) {
                this.ordersList = responseOrders.AllCustomer.Table;
            } else if(responseOrders && responseOrders.ItemValues){
                this.ordersList = responseOrders.ItemValues.Table;
            }

        } catch (error) {
            console.log(error);   
        }
    }

    public handleOrderDetail(data: any) {
        this.orderService.setOrderData(data);
        this.router.navigate(['/dashboard/admin/order/items'], { queryParams: { id: data.Vid, type: data.FoodType, orderId: data.Orid } });
    }
}
