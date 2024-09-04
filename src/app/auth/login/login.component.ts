import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

import { ApiService } from '../../services/api/api.service';
import { UserdetailsService } from '../../services/userdetials/userdetails.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
    ],
    providers: [
        HttpClientModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private router = inject(Router);

    private apiService = inject(ApiService);

    private userDetailsService = inject(UserdetailsService);

    public loginFormDetails = {
        otp: '',
        dhId: 0,
    };

    public async handleLogin() {
        if(this.loginFormDetails['otp']) {

            // sessionStorage.setItem('otp', JSON.stringify(this.loginFormDetails));

            try {

                const response = await lastValueFrom(this.apiService.handleOtpLogin(this.loginFormDetails.otp));

                if(response) {
                    this.userDetailsService.setLoginData(response);

                    const dnIh = response.CheckLoginjs.Table[0].DhId;
                    this.loginFormDetails.dhId = dnIh;
                    
                    sessionStorage.setItem('otp', JSON.stringify(this.loginFormDetails));
                }

            } catch (error) {
                console.log(error);
            }

            this.router.navigate(['/dashboard/home']);
        }
    }
}
