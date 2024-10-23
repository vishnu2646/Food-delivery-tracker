import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../../../services';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-package-form',
    standalone: true,
    imports: [
        FormsModule,
        DropdownModule
    ],
    templateUrl: './package-form.component.html',
    styleUrl: './package-form.component.css'
})
export class PackageFormComponent {
    private apiService = inject(ApiService);

    private router = inject(Router);

    public loggedInUserData: any;

    public types: any;

    public packageForm = {
        date: this.formatDate(new Date()),
        selectedType: {
            Item_Type: ''
        }
    }

    public ngOnInit(): void {
        const userData = sessionStorage.getItem('otp');

        if(userData) {
            const parsedUserData = JSON.parse(userData);
            this.loggedInUserData = parsedUserData;
        }
        this.handleGetItemTypes();
    }

    public async handleGetItemTypes() {
        try {
            const response = await lastValueFrom(this.apiService.getItemTypes(this.loggedInUserData.username));
            if(Object.keys(response).length > 0) {
                this.types = response.PackingType.Table;
            } 
        } catch (error) {
            console.log(error)
        }
    }

    public handleFoodTypeChange(event: DropdownChangeEvent) {
        this.packageForm.selectedType = event.value.Item_Type
        console.log(this.packageForm);
    }

    public handlePackingList() {
        this.router.navigate(['/dashboard/admin/packing-list'], { queryParams: { date: this.packageForm.date, type: this.packageForm.selectedType } });
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
