import { Component, inject, OnInit } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ApiService } from '../../../services';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-packing-list',
    standalone: true,
    imports: [
        FormsModule,
        DropdownModule
    ],
    templateUrl: './packing-list.component.html',
    styleUrl: './packing-list.component.css'
})
export class PackingListComponent implements OnInit {
    private apiService = inject(ApiService);

    private router = inject(Router);

    private activatedRoute = inject(ActivatedRoute);

    public loggedInUserData: any;

    public package = {
        date: '',
        selectedType: ''
    }

    public packageHeader = {
        BalancePacked: 0,
        TotalBills: 0,
        TotalPacked: 0,
    }

    public packageLists: any[] = [];

    public ngOnInit(): void {
        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInUserData = parsedUserData;
        }

        this.activatedRoute.queryParams.subscribe(params => {
            this.package.date = params['date'];
            this.package.selectedType = params['type'];
        });

        this.handleGetAllPackageLists();
    }

    public async handleGetAllPackageLists() {
        try {
            const response = await lastValueFrom(this.apiService.getPackageList(this.package.date, this.package.selectedType));
            if(Object.keys(response).length > 0 && response.MobPackingList) {
                this.packageHeader = response.MobPackingList.Table[0];
                this.packageLists = response.MobPackingList.Table1;
            }
        } catch (error) {
            console.log(error);
        }
    }

    public handlePackageDetail(id: number) {
        this.router.navigate(['/dashboard/admin/packing-details'], { queryParams: { packageId: id } });
    }
}
