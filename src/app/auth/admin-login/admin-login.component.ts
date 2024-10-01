import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService, UserdetailsService } from '../../services';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterModule
    ],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
    private router = inject(Router);

    private apiService = inject(ApiService);

    private userDetailsService = inject(UserdetailsService);

    public loginFormDetails = {
        username: '',
        otp: '',
        dhId: 0,
    };

    public async handleLogin() {
        if(this.loginFormDetails['otp']) {

            // sessionStorage.setItem('otp', JSON.stringify(this.loginFormDetails));

            try {

                const response = await lastValueFrom(this.apiService.handleAdminLogin(this.loginFormDetails.otp, this.loginFormDetails.username));
                if(response) {
                    this.userDetailsService.setLoginData(response);

                    const dnIh = response.AdminLoginjs.Table[0].DhId;
                    this.loginFormDetails.dhId = dnIh;
                    
                    sessionStorage.setItem('otp', JSON.stringify(this.loginFormDetails));
                    
                    this.router.navigate(['/dashboard/admin']);
                }

            } catch (error) {
                console.log(error);
            }

        }
    }
}
