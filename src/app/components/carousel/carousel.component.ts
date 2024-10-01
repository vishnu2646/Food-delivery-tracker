import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
    public activeIndex = 0;

    @Input()
    public heroCarosel: any = [];

    public ngOnInit() {
        setInterval(() => {
            this.toggleHeroItem();
        }, 5000);
    }

    public setActiveHeroItem(itemIndex: number): void {
        this.activeIndex = itemIndex;

        this.heroCarosel.forEach((element: any) => {
            element.isActive = false;
        });

        this.heroCarosel.forEach((element: any, index: number) => {
            if(index === itemIndex) {
                element.isActive = true;
            }
        });
    }

    private toggleHeroItem(): void{
        const activeItem = this.heroCarosel.find((item: any)=> item.isActive === true);
        if(activeItem) {
            // Deactivate current active item
            activeItem.isActive = false;

            // Calculate the next item to be active
            const activeId = activeItem.id + 1;

            // Check if the next active item exists, otherwise loop back to the first item
            const nextActiveItem = this.heroCarosel.find((item: any) => item.id === activeId) || this.heroCarosel[0];

            // Activate the next item (or loop back to the first item if nextActiveItem is null)
            nextActiveItem.isActive = true;
        }
    }
}
