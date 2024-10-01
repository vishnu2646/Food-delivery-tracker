import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { TableModule } from 'primeng/table';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';

import { ICustomerList } from '../../../types';
import { ApiService, UserdetailsService } from '../../../services';

@Component({
    selector: 'app-customerslist',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        AutoCompleteModule,
        TableModule
    ],
    templateUrl: './customerslist.component.html',
    styleUrl: './customerslist.component.css'
})
export class CustomerslistComponent {
    private apiService = inject(ApiService);

    private userDetailsService = inject(UserdetailsService); 

    private router = inject(Router);

    private loggedInUserData: any;

    public customerForm = {
        VCode: '',
        Vname: '',
        Phone: '',
        Address1: '',
        Area: '',
        Route1: ''
    }

    public customerList: ICustomerList[] = [];

    public filteredCustomerList: ICustomerList[] = [];

    public selectedCustomer: ICustomerList = {} as ICustomerList;

    public showUserDetails: boolean = false;

    public selectedFoodType: String = 'All';

    public foodTypes: String[] = ['All', 'BreakFast', 'Lunch', 'Dinner'];

    public OrderList: any[] = [];
    
    public tempOrderList: any[] = [];
    
    public selectedItemToCancel: any;

    public selectedItem: any;

    public cancelItem = {
        orid: 0,
        vid: 0,
        type: '',
        fromDate: '',
        toDate: '',
        reason: ''
    }

    public ngOnInit(): void {
        this.getCustomerList();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    private async getCustomerList(): Promise<void> {
        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInUserData = parsedUserData;
        }
        try {
            const responseCustomerList: any = await lastValueFrom(this.apiService.getCustomersList(this.loggedInUserData?.username));
            if(responseCustomerList) {
                this.customerList = responseCustomerList.Customer.Table;
            }
        } catch (error) {
            console.log(error);
        }
    }

    public handleSearchCustomer(event: AutoCompleteCompleteEvent): void {
        const query = event.query

        // Find the customer using query from the customerList
        this.filteredCustomerList = this.customerList.filter(customer => customer.VCode.includes(query));
    }

    public onCustomerSelect(event: AutoCompleteSelectEvent): void {
        this.selectedCustomer = event.value;
        this.customerForm.Vname = String(this.selectedCustomer.Vname);
        this.customerForm.Phone = String(this.selectedCustomer.Phone);
        this.customerForm.Area = String(this.selectedCustomer.Area);
        this.customerForm.Route1 = String(this.selectedCustomer.Route1);
        this.customerForm.Address1 = String(this.selectedCustomer.Address1);
    }

    public togggleShowDetails() {
        this.showUserDetails = !this.showUserDetails;
    }

    public selectFoodType(foodType: String) {
        this.selectedFoodType = foodType;
        if (foodType === 'All') {
            // Show all items when 'All' is selected
            this.OrderList = this.tempOrderList; // Restore original order list
        } else {
            // Filter the OrderList based on the selected foodType
            this.OrderList = this.tempOrderList.filter(item => String(item.FoodType).toLowerCase() === foodType.toLowerCase());
        }
    }

    public async handleViewOrder(): Promise<void> {
        try {
            const responseData = await lastValueFrom(this.apiService.getCustomerOrders(this.loggedInUserData.username, this.selectedCustomer.Vid, this.selectedFoodType))
            this.OrderList = responseData.OrderDetails.Table1;
            this.tempOrderList  = responseData.OrderDetails.Table1;
        } catch (error) {
            console.log(error);
        }
    }

    public handleItemToCancel() {
        this.selectedItemToCancel = this.selectedItem;
    }

    public handleCancelOrder() {
        if(this.selectedFoodType === "All") {
            alert("Selected food type cannot be All");
        }

        this.cancelItem = {
            type: this.selectedFoodType.toString(),
            orid: this.selectedItemToCancel.Orid,
            vid: this.selectedCustomer.Vid,
            fromDate: this.cancelItem.fromDate,
            toDate: this.cancelItem.toDate,
            reason: ''
        }
    }

    public async handleConfirmCancel(): Promise<void> {        
        try {
            await lastValueFrom(this.apiService.cancelOrder(this.cancelItem));
        } catch (error) {
            console.log("error", error);
        } finally {
            this.handleViewOrder()
        }
    }

    public handleNavigateCreateNewOrder() {
        this.router.navigate(['/dashboard/admin/order/form'], { queryParams: { vid: this.selectedCustomer.Vid, type: this.selectedFoodType, vcode: this.selectedCustomer.VCode } });
    }

    public handleNavigateOrders() {
        this.router.navigate(['/dashboard/admin/orders'], { queryParams: { id: this.selectedCustomer.Vid, type: this.selectedFoodType} });
    }
}
