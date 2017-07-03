import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myObjectKeys' })

export class KeysPipe implements PipeTransform {
  public transform(value, args: string[]): any {
    let keys = [];

    if (!(value instanceof Object)) { return false; }

    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    return keys;
  };
}
