import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService, UserdetailsService } from '../../services';
import { isDefinedAndNotEmpty } from '../../utils/utils';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../components/error/error.component';

@Component({
    selector: 'app-shared-home',
    standalone: true,
    imports: [
        CommonModule,
        ErrorComponent
    ],
    templateUrl: './shared-home.component.html',
    styleUrl: './shared-home.component.css'
})
export class SharedHomeComponent implements OnInit {
    private router = inject(Router);

    private apiService = inject(ApiService);

    private userDetailsService = inject(UserdetailsService);

    public loggedInData: any;

    public cardData: IHomeData = {} as IHomeData;

    public summaryData: any;

    public data: Idata[] = [
        {
            title: 'No of Bills',
            navigateTo: 'noofBills',
            count: 0,
        },
        {
            title: 'Delivered Bills',
            navigateTo: 'deliveredBills',
            count: 0,
        },
        {
            title: 'Balance Bills',
            navigateTo: 'balanceBills',
            count: 0,
        },
        {
            title: 'Total Amount',
            navigateTo: '',
            count: 0
        },
        {
            title: 'Collection Amount',
            navigateTo: '',
            count: 0
        }
    ]

    public showErrorDialog: boolean = false;

    public emptyMessage: String = '';

    public ngOnInit(): void {

        this.userDetailsService.refreshData$.subscribe(() => {
            this.getLogedInData();
        });

        this.getLogedInData();
    }

    public async getLogedInData() {

        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInData = {
                otp: parsedUserData.otp,
                dhId: parsedUserData.dhId
            }
        }

        try {
            const response = await lastValueFrom(this.apiService.getSummary(this.loggedInData.otp, this.loggedInData.dhId));
            if(response) {
                this.summaryData = response.DeliverySummaryjs.Table[0];
            } else if(response.billListjs.Table[0].ErrStatus === "Invalid OTP or Closed Session") {
                this.showErrorDialog = !this.showErrorDialog;
                this.emptyMessage = response.billListjs.Table[0].ErrStatus;
            }
        } catch (error) {
            this.showErrorDialog = true;
            this.emptyMessage = 'Something went wrong!... <br/> Please try again later.';
        }

        if(isDefinedAndNotEmpty(this.loggedInData)) {
            this.data.forEach((data) => {
                if(data.title === 'Balance Bills') {
                    data.count = this.summaryData.BalanceBills;
                } else if(data.title === 'Total Amount') {
                    data.count = this.summaryData.Totalvalue;
                } else if(data.title === 'No of Bills') {
                    data.count = this.summaryData.NoOfBills
                } else if(data.title === 'Delivered Bills') { 
                    data.count = this.summaryData.NoOfBills - this.summaryData.BalanceBills;
                } else if(data.title === 'Collection Amount') {
                    data.count = this.summaryData.CashReceipt
                }
            });
        }
    }

    public nagiateTo(nagiateTo: String) {
        this.router.navigate(['/dashboard/delivery/bills', nagiateTo]);
    }
}


interface IHomeData {
    Actiondate: Date;
    Balance: number;
    BalanceBills: number;
    CashReceipt: number;
    DhId: number;
    DpName: String;
    Dpid: number;
    ErrNo: String;
    Expense: number;
    FinishTime: Date | null;
    Itemtype: String;
    NoOfBills: number;
    StartTime: Date | null;
    Totalvalue: number;
    TripStatus: String;
    Tripid: number;
    VehicleNo: number | null | String;
    VhId: number | null | String;
}

interface Idata {
    title: String;
    navigateTo: String;
    count: number;
}