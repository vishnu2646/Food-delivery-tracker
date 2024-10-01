import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public orderData: any;

    public setOrderData(data: any) {
        this.orderData = data;
    }

    public getOrderData(): any {
        return this.orderData;
    }

}
