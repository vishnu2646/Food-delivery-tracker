import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        RouterModule,
    ],
    providers: [
        HttpClientModule
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent {

}
