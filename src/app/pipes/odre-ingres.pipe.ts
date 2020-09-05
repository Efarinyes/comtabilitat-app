import { Pipe, PipeTransform } from '@angular/core';
import { EntradaSortida } from '../models/entrada-sortida.model';

@Pipe({
  name: 'odreIngres'
})
export class OdreIngresPipe implements PipeTransform {

  transform(items: EntradaSortida[]): EntradaSortida[] {
    return items.slice().sort( (a, b ) => {
      if (a.tipus === 'ingres' ) {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
