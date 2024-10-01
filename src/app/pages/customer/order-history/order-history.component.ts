import { Component } from '@angular/core';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [],
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

    public selecedOption = 'Recently';

    public columns = ['Menu', 'Date', 'Address', 'Price', 'Status'];

    public ordersList = [
        {
            id: 1,
            menu: {
                img: "https://fooddesk.dexignlab.com/xhtml/images/popular-img/pic-1.jpg",
                name: "Fish Burger",
                quantity: 1,
            },
            date: "June 1, 2020, 08:22 AM",
            address: "Elm Street, 23 Yogyakarta 2,97 Km",
            price: "200",
            status: "Completed",
        },
        {
            id: 2,
            menu: {
                img: "https://fooddesk.dexignlab.com/xhtml/images/popular-img/review-img/pic-1.jpg",
                name: "Pepperoni Pizza",
                quantity: 2,
            },
            date: "June 1, 2020, 08:22 AM",
            address: "Elm Street, 23 Yogyakarta 2,97 Km",
            price: "260",
            status: "Completed",
        },
        {
            id: 3,
            menu: {
                img: "https://fooddesk.dexignlab.com/xhtml/images/popular-img/pic-2.jpg",
                name: "Beef Burger",
                quantity: 1,
            },
            date: "June 1, 2020, 08:22 AM",
            address: "Elm Street, 23 Yogyakarta 2,97 Km",
            price: "300",
            status: "Delivering",
        },
        {
            id: 4,
            menu: {
                img: "https://fooddesk.dexignlab.com/xhtml/images/popular-img/review-img/pic-2.jpg",
                name: "Japanese Ramen",
                quantity: 1,
            },
            date: "June 1, 2020, 08:22 AM",
            address: "Elm Street, 23 Yogyakarta 2,97 Km",
            price: "500",
            status: "Canceled",
        }
    ]
}
