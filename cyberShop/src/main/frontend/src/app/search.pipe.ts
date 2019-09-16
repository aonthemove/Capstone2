import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';
import { filter } from 'minimatch';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], searchTerm: string): Product[] {
    let itemsMatching = value.filter((product: Product) => {
      if (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      if (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }

      return false;
    });

    return itemsMatching;
  }
}
