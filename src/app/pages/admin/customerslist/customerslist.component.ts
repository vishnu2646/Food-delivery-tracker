import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { TableModule } from 'primeng/table';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';

import { ICustomerList } from '../../../types';
import { ApiService, UserdetailsService } from '../../../services';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-customerslist',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        AutoCompleteModule,
        TableModule,
        DropdownModule
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

    public foodTypes: any[] = [
        {
            title: 'All',
            name: 'All',
        },
        {
            title: 'BreakFast', 
            name: 'BreakFast'
        },
        {
            title: 'Lunch',
            name: 'Lunch'
        },
        {
            title: 'Dinner',
            name: 'Dinner'
        }
    ];

    public selectedFoodType: any = this.foodTypes[0];

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
        });

        const selectedCustomer = sessionStorage.getItem('selectedCustomer');
        if(selectedCustomer) {
            const parsedSelectCustomer = JSON.parse(selectedCustomer);
            this.selectedCustomer = parsedSelectCustomer;
            this.customerForm = {
                VCode: parsedSelectCustomer.VCode,
                Vname: parsedSelectCustomer.Vname,
                Phone: parsedSelectCustomer.Phone,
                Address1: parsedSelectCustomer.Address1,
                Area: parsedSelectCustomer.Area,
                Route1: parsedSelectCustomer.Route1,
            };
        }
        
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
        this.filteredCustomerList = this.customerList.filter(customer => customer.VCode.includes(query) || customer.Vname.toLowerCase().includes(query));
        
    }

    public onCustomerSelect(event: AutoCompleteSelectEvent): void {
        this.selectedCustomer = event.value;
        sessionStorage.setItem('selectedCustomer', JSON.stringify(this.selectedCustomer));
        this.customerForm.Vname = String(this.selectedCustomer.Vname);
        this.customerForm.Phone = String(this.selectedCustomer.Phone);
        this.customerForm.Area = String(this.selectedCustomer.Area);
        this.customerForm.Route1 = String(this.selectedCustomer.Route1);
        this.customerForm.Address1 = String(this.selectedCustomer.Address1);
        this.handleViewOrder();
    }

    public togggleShowDetails() {
        this.showUserDetails = !this.showUserDetails;
    }

    public selectFoodType(event: DropdownChangeEvent) {
        this.selectedFoodType = event.value;
        const type = event.value.title
        if (type === 'All') {
            // Show all items when 'All' is selected
            this.OrderList = this.tempOrderList; // Restore original order list
        } else {
            // Filter the OrderList based on the selected foodType
            this.OrderList = this.tempOrderList.filter(item => String(item.FoodType).toLowerCase() === type.toLowerCase());
        }
    }

    public async handleViewOrder(): Promise<void> {
        const type = this.selectedFoodType.title;
       
        try {
            const responseData = await lastValueFrom(this.apiService.getCustomerOrders(this.loggedInUserData.username, this.selectedCustomer.Vid, type))
            this.OrderList = responseData.CustomerOrderDetails.Table1;
            this.tempOrderList  = responseData.CustomerOrderDetails.Table1;
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

    public async handleDeleteItem(item: any) {
        const orid = item.Orid;
        const itemId = item.Itemid;
        const date = item.Ordate;

        try {
            const responseData = await lastValueFrom(this.apiService.deleteOrderItem(orid, itemId, date));
            alert(responseData);
        } catch (error) {
            console.log("error", error);
        }

        this.handleViewOrder()
    }

    public handleResetCustomerSelection() {
        sessionStorage.removeItem('selectedCustomer');

        this.customerForm = {
            VCode: '',
            Vname: '',
            Phone: '',
            Address1: '',
            Area: '',
            Route1: ''
        }
    }

    public handleNavigateCreateNewOrder() {
        this.router.navigate(['/dashboard/admin/order/form'], { queryParams: { vid: this.selectedCustomer.Vid, type: this.selectedFoodType.title, vcode: this.selectedCustomer.VCode } });
    }

    public handleNavigateOrders() {
        this.router.navigate(['/dashboard/admin/orders'], { queryParams: { id: this.selectedCustomer.Vid, type: this.selectedFoodType} });
    }
}
