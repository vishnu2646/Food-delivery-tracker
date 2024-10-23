import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, lastValueFrom, Subject } from 'rxjs';

@Component({
    selector: 'app-package-details',
    standalone: true,
    imports: [

    ],
    templateUrl: './package-details.component.html',
    styleUrl: './package-details.component.css'
})
export class PackageDetailsComponent implements OnInit, OnDestroy {
    private apiService = inject(ApiService);

    private activatedRouter = inject(ActivatedRoute);

    private route = inject(Router);

    public packageId: number = 0;

    public packageDetailsList: any[] = [];

    public loggedInUserData: any;

    public searchInput = new Subject<String>();

    public originalPackageDetailsList: any[] = [];

    public packageHeader = {
        Dpname: '',
        BalancePacked: 0,
        Noofbills: 0,
        TotalPacked: 0,
    }

    constructor() {
        this.searchInput
            .pipe(debounceTime(300))
            .subscribe((searchTerm: String) => {
                this.handlePackageFilterSearch(searchTerm);
            });
    }

    public ngOnInit(): void {

        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInUserData = parsedUserData;
        }

        this.activatedRouter.queryParams.subscribe(params => {
            this.packageId = params['packageId'];
        });

        this.handleGetPackageDetails();
    }

    public ngOnDestroy(): void {
        this.searchInput.complete();
    }

    public async handleGetPackageDetails(): Promise<void> {
        try {
            const response = await lastValueFrom(this.apiService.getPackageDetails(this.packageId))
            if(Object.keys(response).length > 0 && response.DpersonOrderList) {
                this.packageHeader = response.DpersonOrderList.Table[0];
                this.packageDetailsList = response.DpersonOrderList.Table1;
                this.originalPackageDetailsList = response.DpersonOrderList.Table1;
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async handlePackedType(order: any, type: String) {
        try {
            const data = {
                Seqid: order.SeqId,
                dhid: order.Dhid,
                Packed: type === 'packed' ? 1 : 0,
                user: this.loggedInUserData.username
            };

            const response = await lastValueFrom(this.apiService.updatePackingType(data, type));
            if (response) {
                alert(response);
            }
            this.handleGetPackageDetails();
        } catch (error) {
            console.log(error);
        }
    }

    public handleFilterInputChange(value: String) {
        this.searchInput.next(value);
    }

    private handlePackageFilterSearch(value: String) {
        if(value.length > 0) {
            this.packageDetailsList = this.originalPackageDetailsList.filter(pack =>
                pack.VName.toLowerCase().includes(value.toLowerCase()) ||
                pack.Vcode.includes(value)
            );
        } else {
            this.packageDetailsList = [...this.originalPackageDetailsList];
        }
    }
}
