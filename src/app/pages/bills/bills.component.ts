import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { ApiService, UserdetailsService } from '../../services';
import { CommonModule } from '@angular/common';
import { FilterPipe } from "../../pipes/filter/filter.pipe";
import { ErrorComponent } from '../../components/error/error.component';

@Component({
    selector: 'app-bills',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FilterPipe,
        ErrorComponent
    ],
    templateUrl: './bills.component.html',
    styleUrl: './bills.component.css'
})
export class BillsComponent implements OnInit {
    private router = inject(Router);

    private activatedRoute = inject(ActivatedRoute);

    private apiService = inject(ApiService);

    public emptyBillMessage: String = '';

    private loggedInData: any;
        
    public param: String | null = '';
    
    public bills: any = [];

    public emptyMessage: String = '';

    public searchText: String = '';

    public title: String = '';

    public ngOnInit(): void {
        this.getParamData();
        this.getBillLists();
    }

    private getParamData() {
        this.activatedRoute.paramMap.subscribe(param => {
            this.param = param.get('param');
        });

        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInData = {
                otp: parsedUserData.otp,
                dhId: parsedUserData.dhId
            }
        }
    }

    public showErrorDialog: boolean = false;

    public async getBillLists() {
        switch(this.param) {
            case 'noofBills':
                this.title = "Order Bills";
                try {
                    const response = await lastValueFrom(this.apiService.getAllBills(this.loggedInData.dhId, this.loggedInData.otp))
                    console.log(response);
                    if(response  && response.BillListjs.Table.length >= 0) {
                        this.bills = response.BillListjs.Table;
                    } else if(response.BillListjs.Table.length === 0) {
                        this.emptyBillMessage = "No Bills Available"
                    } else if(response.billListjs.Table[0].ErrStatus === "Invalid OTP or Closed Session") {
                        this.showErrorDialog = !this.showErrorDialog;
                        this.emptyMessage = response.billListjs.Table[0].ErrStatus;
                    }
                } catch (error) {
                    this.showErrorDialog = true;
                    this.emptyMessage = 'Something went wrong!... <br/> please login again...'
                }
                break;
            case 'deliveredBills':
                this.title = "Delivered Bills";
                try {
                    const response = await lastValueFrom(this.apiService.getDeliveredBills(this.loggedInData.dhId, this.loggedInData.otp));
                    if(response && response.BillListjs.Table.length >= 0) {
                        this.bills = response.BillListjs.Table;
                    } else if(response.BillListjs.Table.length === 0) {
                        this.emptyBillMessage = "No Delivered bills Available"
                    } else if (response.billListjs.Table[0].ErrStatus === "Invalid OTP or Closed Session") {
                        this.showErrorDialog = !this.showErrorDialog;
                        this.emptyMessage = response.billListjs.Table[0].ErrStatus;
                    }
                } catch (error) {
                    this.showErrorDialog = true;
                    this.emptyMessage = 'Something went wrong!... <br/> please login again...'
                }
                break;

            case 'balanceBills':
                this.title = "Balance Bills";
                try {
                    const response = await lastValueFrom(this.apiService.getBalanceBills(this.loggedInData.dhId, this.loggedInData.otp));
                    if(response && response.BillListjs.Table.length > 0) {
                        this.bills = response.BillListjs.Table;
                    } else if(response.BillListjs.Table.length === 0) {
                        this.emptyBillMessage = "No Balance bills Available"
                    } else if(response.billListjs.Table[0].ErrStatus === "Invalid OTP or Closed Session") {
                        this.showErrorDialog = !this.showErrorDialog;
                        this.emptyMessage = response.billListjs.Table[0].ErrStatus;
                    }
                } catch (error) {
                    this.showErrorDialog = true;
                    this.emptyMessage = 'Something went wrong!... <br/> please login again...'
                }
                break;
        }
    }

    public getDetails(bill: any): void {
        this.router.navigate(["/dashboard/billdetails", bill.SeqId ])
    }
}
