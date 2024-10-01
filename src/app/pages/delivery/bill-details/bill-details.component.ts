import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { lastValueFrom } from 'rxjs';

import { ApiService, UserdetailsService } from '../../../services';
import { ErrorComponent } from '../../../components/error/error.component';

@Component({
    selector: 'app-bill-details',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        ErrorComponent
    ],
    templateUrl: './bill-details.component.html',
    styleUrl: './bill-details.component.css'
})
export class BillDetailsComponent implements OnInit {
    private location = inject(Location);

    private activatedRoute = inject(ActivatedRoute);

    private apiService = inject(ApiService);

    private loggedInData: any;
    
    private otp: String = '';
    
    private dhId: number = 0;
    
    private seqId: number = 0;

    public showErrorDialog: boolean = false;

    public emptyMessage: String = '';

    public bill: IBill = {} as IBill;

    public edit_status: boolean = false;

    public selected_status: { code: number; name: String; }[] | undefined;

    public selected_payment_mode: { code: number; mode: String; }[] | undefined;

    public options: any[] | undefined;

    public paymentOptions: any[] | undefined;

    public isEditMode: Record<EditModeFields, boolean> = {
        DeliveryTimeRemark: false,
        selected_status: false,
        selected_payment_mode: false,
        PaidAmount: false,
        TransactionNo: false
    };

    public updateBill = {
        DeliveryStatus: 0,
        Paymode: 'Not Paid',
        TransactionNo: '',
        DeliveryTimeRemark: '',
        PaidAmount: 0,
    }

    @ViewChild('deliveryStatus', { static: true })
    public deliveryStatusValue: ElementRef | undefined = undefined

    public ngOnInit(): void {
        window.scroll(0, 0);

        this.options = [
            { code: 0, status: 'Not deliveried' },
            { code: 1, status: 'Delivery Done' },
            { code: 2, status: 'Hold' },
        ];
        
        this.paymentOptions = [
            { code: 0, mode: 'Cash' },
            { code: 1, mode: 'UPI' },
        ];

        this.getSequenceNumberParam();
        this.getBillDetail();
    }

    public getSequenceNumberParam(): void {
        this.activatedRoute.paramMap.subscribe(param => {
            this.seqId = Number(param.get('id'));
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

    public async getBillDetail() {
        try {
            const response = await lastValueFrom(this.apiService.getIndividualBillDetail(this.loggedInData.dhId, this.loggedInData.otp, this.seqId))
            if(response && response.IndividualBillDetailsjs.Table.length > 0) {
                this.bill = response.IndividualBillDetailsjs.Table[0];
                this.updateBill = {
                    DeliveryTimeRemark: String(this.bill.DeliveryTimeRemark) === null ? '' : String(this.bill.DeliveryTimeRemark),
                    Paymode: String(this.bill.Paymode) || '',
                    PaidAmount: Number(this.bill.PaidAmount) || 0,
                    TransactionNo: String(this.bill.TransactionNo) || '',
                    DeliveryStatus: this.bill.DeliveryStatus === 0 ? 0 : this.bill.DeliveryStatus === 1 ? 1 : 2
                }
            } else {
                this.bill = {} as IBill;
                if(response.billListjs.Table[0].ErrStatus === "Invalid OTP or Closed Session") {
                    this.showErrorDialog = !this.showErrorDialog;
                    this.emptyMessage = response.billListjs.Table[0].ErrStatus;
                }
            }
        } catch (error) {
            console.log("detial error");
            console.log("error", error);
            this.showErrorDialog = true;
            this.emptyMessage = 'Something went wrong!... <br/> please login again...'
        }
    }

    public toggleEditMode(field: EditModeFields): void {
        this.isEditMode[field] = !this.isEditMode[field];
    }

    public editStatus(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.updateBill.DeliveryStatus = Number(selectElement.value);
        this.toggleEditMode('selected_status');
    }

    public editPaymentMode(event: any) {
        // const eventData = event;
        // const mode = eventData.value.mode;
        console.log("here");
        this.updateBill.Paymode = event.target.value;
        this.toggleEditMode('selected_payment_mode');
    }

    public async makePayment() {

        try {
            const updateBillData = { DhId: this.loggedInData.dhId, OTP: this.loggedInData.otp, SeqId: this.seqId, ...this.updateBill };
            console.log(updateBillData);
            
            const response = await lastValueFrom(this.apiService.updateBill(updateBillData));

            if(response === "Bill Updated Successfully.") {
                alert(response);
                this.location.back();
            }
            
        } catch (err) {
            console.log(err);
        }
    }
}

interface IBill {
    ErrNo: String;
    SeqId: number,
    DhId: number,
    Cpid: number,
    InvNo: String;
    InvDate: Date;
    Vid: number,
    Vcode: String;
    VName: String;
    ItemDesc: String;
    BillAddress: String;
    DelAddress: String;
    Area: String;
    Dpid: number,
    DeliveryPerson: String;
    NoOfItems: number,
    Subtotal: number,
    Taxtotal: number,
    NetTotal: number,
    DeliveryRemark: String | null,
    Balance: number,
    BalanceUpto: String | null,
    Paymode: String;
    TransactionNo: number;
    PaidAmount: number;
    PaidDateTime: Date;
    Paidby: String;
    GPSloc: String | null;
    DeliveryStatus: number;
    DeliveryTimeRemark: String | null;
}

type EditModeFields = 'DeliveryTimeRemark' | 'selected_status' | 'selected_payment_mode' | 'PaidAmount' | 'TransactionNo';