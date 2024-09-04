import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICheckLogin } from '../../types';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject<HttpClient>(HttpClient);

    private baseUrl: String = environment.domain;

    private key: String = "Annamfood";

    public handleOtpLogin(otp: String): Observable<ICheckLogin> {
        return this.http.get<ICheckLogin>(`${this.baseUrl}/CheckLogin?OTP=${otp}&databaseKey=${this.key}`)
    }

    public getSummary(otp: String, dhId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/getDeliverySummary?OTP=${otp}&dhid=${dhId}&databaseKey=${this.key}`)
    }

    public getAllBills(dhId: number, otp: String): Observable<any> {
        return this.http.get(`${this.baseUrl}/getBillList?dhid=${dhId}&OTP=${otp}&Ltype=All&databaseKey=${this.key}`)
    }

    public getDeliveredBills(dhId: number, otp: String): Observable<any> {
        return this.http.get(`${this.baseUrl}/getBillList?dhid=${dhId}&OTP=${otp}&Ltype=delivered&databaseKey=${this.key}`)
    }

    public getBalanceBills(dhId: number, otp: String): Observable<any> {
        return this.http.get(`${this.baseUrl}/getBillList?dhid=${dhId}&OTP=${otp}&Ltype=balance&databaseKey=${this.key}`)
    }

    public getIndividualBillDetail(dhId: number, otp: String, seqId: Number): Observable<any> {
        return this.http.get(`${this.baseUrl}/getIndividualBillDetails?dhid=${dhId}&OTP=${otp}&seqId=${seqId}&databaseKey=${this.key}`)
    }

    public updateBill(data: any) {
        return this.http.post(`${this.baseUrl}/BillUpdate?databaseKey=${this.key}`, data)
    }
}
