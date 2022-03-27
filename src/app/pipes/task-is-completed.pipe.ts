import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskIsCompleted'
})
export class TaskIsCompletedPipe implements PipeTransform {

  transform(value: any): any {
    return value ? 'Si' : 'No';;
  }

}
