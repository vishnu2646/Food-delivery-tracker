import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { BillsComponent } from './pages/bills/bills.component';
import { PaymentReviewComponent } from './pages/payment-review/payment-review.component';
import { BillDetailsComponent } from './pages/bill-details/bill-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    { 
        path: 'auth', 
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: "bills/:param",
                component: BillsComponent,
            },
            {
                path: 'billdetails/:id',
                component: BillDetailsComponent
            }
        ]
    }
];
