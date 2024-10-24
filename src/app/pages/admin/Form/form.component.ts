import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

import { TableModule } from 'primeng/table';
import { ApiService } from '../../../services';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import moment from 'moment';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        FormsModule,
        DialogModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        CalendarModule,
        TableModule,
        AutoCompleteModule,
        CommonModule
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
    private activatedRouter = inject(ActivatedRoute);

    private router = inject(Router);

    private apiService = inject(ApiService);

    public formType: String = '';

    public itemForm = {
        item_type: '',
        item: '',
        qty: 1,
        order_date: '',
        remarks: '',
    }

    public id: String = "";

    public code: String = "";

    public fromDate: any;

    public toDate: any;

    public types: any[] = [
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

    public visible: boolean = false;

    public enableDateRange: boolean = false;

    public availItems: IItem[] = [];

    public items: any[] = [];

    public filteredItems: IItem[] = [];

    public seletedItemType: any;

    public seletedItem: any;

    public selectedCustomer: any;

    public dateTypes: String[] = ["Today", "Tomorrow", "Continous"];

    public selectedDateType: String = "";

    public loggedInUserData: any;

    public ngOnInit() {
        this.activatedRouter.queryParams.subscribe(params => {
            this.id = params['vid'];
            this.formType = params['type'];
            this.itemForm.item_type = params['type'];
            this.code = params['vcode'];
        });

        // Initially selecte the date type for oder.
        this.selectedDateType = 'Today';

        // Intially Load the date for continuous date type selection for order.
        const today = new Date().toISOString().split('T')[0];
        this.fromDate = today;
        this.toDate = today;

        // Initialy loads the type of the food.
        this.seletedItemType = this.types.filter(t => t.title === this.formType)[0];
        this.itemForm.item_type = this.seletedItemType.title;

        // Loads the food items for the order.
        this.getOrderItems();

        // Loads the selected customer from the session.
        const selectedCustomer = sessionStorage.getItem('selectedCustomer');
        if(selectedCustomer) {
            const parsedSelectedCustomer = JSON.parse(selectedCustomer);
            this.selectedCustomer = parsedSelectedCustomer;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    public handleItemTypeChange(event: DropdownChangeEvent): void {
        this.seletedItemType = event.value;
        this.formType = event.value.title;
        this.itemForm.item_type = event.value['Item_type'];
        if(this.seletedItemType) {
            this.getOrderItems();
        }
    }

    public async getOrderItems(): Promise<void> {
        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInUserData = parsedUserData;
        }
        try {
            const responseData = await lastValueFrom(this.apiService.getCreateOrder(this.id, this.seletedItemType.title, this.loggedInUserData.username));
            if(responseData) {
                this.availItems = responseData.Customer.Table1
            }
        } catch (error) {
            console.log(error);
        }
    }

    public handleFilterItem(event: AutoCompleteCompleteEvent) {
        let query = event.query;
        this.filteredItems = this.availItems.filter(item => item.Item_desc1.toLowerCase().includes(query));
    }

    public handleSelectItem(event: AutoCompleteSelectEvent) {
        this.seletedItem = event.value;
        this.itemForm.item = event.value.Item_desc1;
    }

    public seletedOrderDate(type: String) {
        const today = moment().format('YYYY-MM-DD');
        const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
        
        this.selectedDateType = type;
        this.enableDateRange = type === 'Continous' ? !this.enableDateRange : false;
        
        if(type === 'Continous') {
            this.fromDate = today;
            this.toDate = today;
        } else if(type === 'Tomorrow') {
            this.fromDate = tomorrow;
            this.toDate = tomorrow;
        } else if(type === 'Today') {
            this.fromDate = today;
            this.toDate = today;
        }

        const selectedDate = type === 'Tomorrow' ? tomorrow : today;

        this.itemForm.order_date = selectedDate;
    }

    public resetItemForm() {
        this.itemForm = {
            item_type: '',
            item: '',
            qty: 1,
            order_date: '',
            remarks: '',
        }
    }

    public async handleAddItem() {
        const itemToSave = {
            vid: String(this.id),
            vcode: String(this.code),
            fromdate: moment(this.fromDate).format('YYYY-MM-DD'),
            todate: moment(this.toDate).format('YYYY-MM-DD'),
            itemid: this.seletedItem.ItemId,
            Qty: this.itemForm.qty,
            remarks: this.itemForm.remarks,
            user: this.loggedInUserData.username,
            item_desc: this.itemForm.item,
        }
        this.items.push(itemToSave);
        const {item_desc, ...newData} = itemToSave;
        try {
            const responseData = await lastValueFrom(this.apiService.createSaveOrder(newData));
            if(responseData) {
                alert(responseData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.resetItemForm();
        }

    }

    public handleSubmit() {
        this.router.navigate(['/dashboard/admin/orders'], { queryParams: { id: this.id, type: this.seletedItemType.title } });
    }

}

interface IItem {
    ItemId: number;
    DCAPPLY: String;
    Item: String;
    Item_desc1: String;
    StandardCost: number;
    notes: String;
    packdesc: String;
    packid: String;
}