import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/delivery/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { BillsComponent } from './pages/delivery/bills/bills.component';
import { BillDetailsComponent } from './pages/delivery/bill-details/bill-details.component';
import { CustomerLoginComponent } from './auth/customer-login/customer-login.component';
import { CheckoutComponent } from './pages/customer/checkout/checkout.component';
import { OrderHistoryComponent } from './pages/customer/order-history/order-history.component';
import { DashboardComponent } from './pages/customer/dashboard/dashboard.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { MenuListComponent } from './pages/customer/menu-list/menu-list.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminHomeComponent } from './pages/admin/home/home.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { OrderitemsComponent } from './pages/admin/orderitems/orderitems.component';
import { FormComponent } from './pages/admin/Form/form.component';
import { CustomerslistComponent } from './pages/admin/customerslist/customerslist.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { PackingListComponent } from './pages/admin/packing-list/packing-list.component';
import { PackageFormComponent } from './pages/admin/package-form/package-form.component';
import { PackageDetailsComponent } from './pages/admin/package-details/package-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/delivery-login',
        pathMatch: 'full'
    },
    { 
        path: 'auth', 
        component: AuthComponent,
        children: [
            {
                path: 'delivery-login',
                component: LoginComponent
            },
            {
                path: 'login',
                component: CustomerLoginComponent
            },
            {
                path: 'admin-login',
                component: AdminLoginComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            {
                path: 'delivery',
                component: DeliveryComponent,
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
                    },
                ]
            },
            {
                path: 'customer',
                component: CustomerComponent,
                children: [
                    {
                        path: '',
                        component: DashboardComponent
                    },
                    {
                        path: 'menulist',
                        component: MenuListComponent
                    },
                    {
                        path: 'order',
                        component: OrderHistoryComponent
                    },
                    {
                        path: 'checkout',
                        component: CheckoutComponent
                    },
                ]
            },
            {
                path: 'admin',
                component: AdminComponent,
                children: [
                    {
                        path: '',
                        component: AdminHomeComponent
                    },
                    {
                        path: 'customer-orders',
                        component: CustomerslistComponent
                    },
                    {
                        path: 'orders',
                        component: OrdersComponent
                    },
                    {
                        path: 'order/items',
                        component: OrderitemsComponent
                    },
                    {
                        path: 'order/form',
                        component: FormComponent
                    },
                    {
                        path: 'packing-list',
                        component: PackingListComponent
                    },
                    {
                        path: 'packing-form',
                        component: PackageFormComponent
                    },
                    {
                        path: 'packing-details',
                        component: PackageDetailsComponent
                    }
                ]
            }
        ]
    }
];
