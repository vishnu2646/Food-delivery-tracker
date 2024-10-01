import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { decreaseQuantity, increaseQuantity } from '../../../shared/store/quantityStore/quantity.actions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, OnDestroy {

    public quantity: number = 1;

    public quantitySubscription: Subscription | undefined;

    public repeatOrder: boolean = false;

    constructor(private store: Store<{quantity: { quantity: number }}>) {}

    public ngOnInit(): void {
        this.quantitySubscription = this.store.select('quantity').subscribe(data => {
            this.quantity = data.quantity;
        });
    }

    public ngOnDestroy(): void {
        if(this.quantitySubscription) {
            this.quantitySubscription.unsubscribe();
        }
    }

    public handleIncreaseQuantity (): void {
        this.store.dispatch(increaseQuantity());
    }

    public handleDecreaseQuantity (): void {
        if(this.quantity > 1) {
            this.store.dispatch(decreaseQuantity())
        }
    }
}
