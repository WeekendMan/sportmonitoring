import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myPreparingNumericDate' })

export class PrepareNumericDatePipe implements PipeTransform {
  public transform(value, arg: string): string {
    let date: Date = new Date(value * 1000);

    if (!(date instanceof Date && !isNaN(date.valueOf()))) {
      return null;
    }

    if (arg  === 'timeOnly') {
      return `${('0' + date.getHours().toString()).slice(-2)}:${('0' + date.getMinutes().toString()).slice(-2)}`;
    } else {
      return `
        ${('0' + date.getDate().toString()).slice(-2)}.${('0' + (date.getMonth() + 1).toString()).slice(-2)}.${date.getFullYear()}
        ${('0' + date.getHours().toString()).slice(-2)}:${('0' + date.getMinutes().toString()).slice(-2)}
      `;
    }
  };
}
