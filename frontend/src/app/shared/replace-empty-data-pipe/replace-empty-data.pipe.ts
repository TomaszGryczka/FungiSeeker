import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceEmptyData'
})
export class ReplaceEmptyDataPipe implements PipeTransform {

  transform(value: any, replaceWith: string | number): any {
    return value ? value : replaceWith;
  }
}
