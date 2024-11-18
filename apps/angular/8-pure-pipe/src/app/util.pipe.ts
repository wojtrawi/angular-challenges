import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appUtil',
  standalone: true,
})
export class UtilPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
