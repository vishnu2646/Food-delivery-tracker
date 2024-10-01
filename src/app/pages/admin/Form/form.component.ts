import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

import { IFoodType } from '../../../types';
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

    public types: IFoodType[] = [] as IFoodType[];

    public visible: boolean = false;

    public enableDateRange: boolean = false;

    public rangeDates: Date[] | undefined;

    public availItems: IItem[] = [];

    public items: any[] = [];

    public filteredItems: IItem[] = [];

    public seletedItemType: any;

    public seletedItem: any;

    public dateTypes: String[] = ["Today", "Tomorrow", "Continous"];

    public selectedDateType: String = "";

    public loggedInUserData: any;

    public itemToSave = {
        vid: '',
        vcode: '',
        fromdate: '',
        todate: '',
        itemid: '',
        Qty: 1,
        remarks: '',
        user: '',
        item_desc: '',
    }

    public ngOnInit() {
        this.activatedRouter.queryParams.subscribe(params => {
            this.id = params['vid'];
            this.formType = params['type'];
            this.code = params['vcode'];
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        this.types = [
            {
                Item_type: "Breakfast"
            },
            {
                Item_type: "Lunch"
            },
            {
                Item_type: "Dinner"
            },
        ]

        this.seletedItemType = this.types.filter(t => t.Item_type === this.formType)[0];
        this.itemForm.item_type = this.seletedItemType.Item_type;
        this.getOrderItems();
    }

    public handleItemTypeChange(event: DropdownChangeEvent): void {
        this.seletedItemType = event.value;
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
            const responseData = await lastValueFrom(this.apiService.getCreateOrder(this.id, this.seletedItemType['Item_type'], this.loggedInUserData.username));
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
        this.itemToSave.itemid = event.value.ItemId;
    }

    public handleDateChange(event: Event, type: String) {
        const elemet = event.target as HTMLInputElement;
        if(type === 'from') {
            this.itemToSave.fromdate = elemet.value;
        } else if(type === 'to') {
            this.itemToSave.todate = elemet.value;
        }
    }

    public seletedOrderDate(type: String) {
        // const today = new Date();
        // let tomorrow = new Date();
        // tomorrow.setDate(tomorrow.getDate() + 1);

        // this.selectedDateType = type;
        // if(type === 'Continous') {
        //     this.enableDateRange = !this.enableDateRange;
        // } else {
        //     this.enableDateRange = false;
        // }

        // switch(this.selectedDateType) {
        //     case 'Tomorrow':
        //         this.itemForm.order_date = `${moment(tomorrow).format('YYYY-MM-DD')}`;
        //         this.itemToSave.fromdate = `${moment(tomorrow).format('YYYY-MM-DD')}`;
        //         this.itemToSave.todate = `${moment(tomorrow).format('YYYY-MM-DD')}`;
        //         break;
            
        //     default:
        //         this.itemForm.order_date = moment(today).format('YYYY-MM-DD');
        //         this.itemToSave.fromdate = moment(today).format('YYYY-MM-DD');
        //         this.itemToSave.todate = moment(today).format('YYYY-MM-DD');
        //         break;
        // }

        const today = moment().format('YYYY-MM-DD');
        const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

        this.selectedDateType = type;
        this.enableDateRange = type === 'Continous' ? !this.enableDateRange : false;

        const selectedDate = type === 'Tomorrow' ? tomorrow : today;

        this.itemForm.order_date = selectedDate;
        this.itemToSave.fromdate = selectedDate;
        this.itemToSave.todate = selectedDate;
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
        this.itemToSave.vid = String(this.id),
        this.itemToSave.vcode = String(this.code),
        this.itemToSave.Qty = this.itemForm.qty,
        this.itemToSave.user = this.loggedInUserData.username,
        this.itemToSave.remarks = this.itemForm.remarks,
        this.itemToSave.item_desc = this.itemForm.item;
        const data = (({ item_desc, ...newItem }) => newItem)(this.itemToSave);
        this.items.push(this.itemToSave);
        try {
            const responseData = await lastValueFrom(this.apiService.createSaveOrder(data));
            if(responseData) {
                alert(responseData);
            }
        } catch (error) {
            console.log(error);
        }
        this.resetItemForm();
    }

    public handleSubmit() {
        this.router.navigate(['/dashboard/admin/orders'], { queryParams: { id: this.id, type: this.seletedItemType['Item_type'] } });
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