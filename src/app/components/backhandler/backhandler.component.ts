import { Component, inject, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { UserdetailsService } from '../../services';

@Component({
    selector: 'app-backhandler',
    standalone: true,
    imports: [],
    templateUrl: './backhandler.component.html',
    styleUrl: './backhandler.component.css'
})
export class BackhandlerComponent {
    private location = inject(Location);

    private router = inject(Router);

    private userDetailsService = inject(UserdetailsService);

    @Input()
    public routeWithParams: any = {
        route: '',
        params: {},
    };

    public goBack() {
        if(this.routeWithParams && this.routeWithParams.route) {
            this.router.navigate([this.routeWithParams.route], { queryParams: this.routeWithParams.params });
        } else {
            this.location.back();
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    if(this.router.url.includes('/dashboard/delivery/home')) {
                        this.userDetailsService.requestRefresh();
                    }
                }
            });
        }
    }
}
