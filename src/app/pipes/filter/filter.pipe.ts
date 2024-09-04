import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], searchText: String): any[] {
        if(items.length === 0) {
            return [];
        }

        if(!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        return items.filter(item => {
            if(
                item.Vcode.includes(searchText) || 
                String(item.PaidAmount).includes(String(searchText)) ||
                item.InvNo.includes(searchText) ||
                item.VName.toLowerCase().includes(searchText) || 
                String(item.NetTotal).includes(String(searchText)) ||
                item.DelAddress.includes(searchText)
            ) {
                return item;
            }
        })
    }

}
