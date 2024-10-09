import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICheckLogin, ICustomerList } from '../../types';
import { environment } from '../../../environments/environment';
import moment from 'moment';

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

    public handleAdminLogin(otp: String, username: String): Observable<any> {
        return this.http.get<ICheckLogin>(`${this.baseUrl}/AdminLogin?OTP=${otp}&username=${username}&databaseKey=${this.key}`)
    }

    // Delivery Apis endpoints.
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

    // Admin Endpoints.
    public getCustomersList(username: String): Observable<any> {
        return this.http.get(`${this.baseUrl}/CustomerList?User=${username}&databaseKey=${this.key}`);
    }

    public getCustomerOrders(username: String, id: number, type: String): Observable<any> {
        return this.http.get(`${this.baseUrl}/CustomerOrderDetails?User=${username}&Vid=${id}&Itemtype=${type}&databaseKey=${this.key}`);
    }

    public getOrderItemDetails(username: String, id: number, type: String, orid: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/OrderDetails?User=${username}&Vid=${id}&Orid=${orid}&Itemtype=${type}&databaseKey=${this.key}`);
    }

    public getCreateOrder(vid: String, type: String, username: String): Observable<any> {
        const date = moment(new Date()).format('YYYY-MM-DD');
        return this.http.get(`${this.baseUrl}/CreateOrder?Vid=${vid}&StartDate=${date}&itemtype=${type}&User=${username}&databaseKey=${this.key}`)
    }

    public createSaveOrder(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/SaveOrder?databaseKey=${this.key}`, data);
    }

    public cancelOrder(data: any): Observable<any> {
        return this.http.get(`${this.baseUrl}/Addtocancel?FromDate=${data.fromDate}&ToDate=${data.toDate}&ItemType=${data.type}&Reason=${data.reason}&Vid=${data.vid}&OrId=${data.orid}&databaseKey=${this.key}`)
    }

    public deleteOrderItem(orId: number, itemId: number, date: String): Observable<any> {
        return this.http.get(`${this.baseUrl}/DeleteItem?Orid=${orId}&itemid=${itemId}&OrdDate=${date}&databaseKey=${this.key}`)
    }

    public getOrdersList(type: String, username: String, date?: String, vid?: String): Observable<any> {
        if(vid !== '') {
            return this.http.get(`${this.baseUrl}/OrderList?Vid=${vid}&User=${username}&databaseKey=${this.key}`);
        } else {
            return this.http.get(`${this.baseUrl}/AllOrderDetails?User=${username}&orddate=${date}&Itemtype=${type}&databaseKey=${this.key}`);
        }
    }
}
