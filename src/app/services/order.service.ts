import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public orderData: any;

    public foodType: any;

    public setOrderData(data: any) {
        this.orderData = data;
    }

    public setFoodType(foodType: any) {
        this.foodType = foodType;
    }

    public getOrderData(): any {
        return this.orderData;
    }

    public getFoodType(): any {
        return this.foodType;
    }

}
