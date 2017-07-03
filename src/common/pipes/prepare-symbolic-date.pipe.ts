import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myPreparingSymbolicDate' })

export class PrepareSymbolicDatePipe implements PipeTransform {
  private months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };

  public transform(value, arg: string): string {
    let date: Date = new Date(value * 1000);

    if (!(date instanceof Date && !isNaN(date.valueOf()))) {
      return null;
    }

    if (arg  === 'timeOnly') {
      return `${('0' + date.getHours().toString()).slice(-2)}:${('0' + date.getMinutes().toString()).slice(-2)}`;
    } else {
      return `
        ${('0' + date.getHours().toString()).slice(-2)}:${('0' + date.getMinutes().toString()).slice(-2)}
        ${('0' + date.getDate().toString()).slice(-2)} ${this.months[ date.getMonth() ]} ${date.getFullYear()}
      `;
    }
  };
}
