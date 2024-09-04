import { Injectable } from '@angular/core';
import { ICheckLogin } from '../../types';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserdetailsService {

    private LoginData: any;

    public userData = {
        otp: '',
        loginData: {},
    }

    public isLoggedIn$ = new BehaviorSubject<boolean>(false);

    private refreshSubject = new Subject<void>();

    public refreshData$ = this.refreshSubject.asObservable();

    public setLoginData(loginData: ICheckLogin) {

        const otpData = sessionStorage.getItem('otp');

        let parsedOtpData;

        if(otpData) {
            parsedOtpData = JSON.parse(otpData);
        }

        this.userData = {
            otp: parsedOtpData,
            loginData: loginData
        }
    }

    public getLoginData(): ICheckLogin {
        const data = sessionStorage.getItem('details');

        if(data) {
            this.LoginData = JSON.parse(data);
        }
        
        return this.LoginData;
    }

    public isLoggedIn(): boolean {
        return !! this.userData;
    }

    public requestRefresh() {
        this.refreshSubject.next();
    }

}
