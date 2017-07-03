import { PipeTransform, Pipe } from '@angular/core';
import { Http } from '@angular/http';

@Pipe({ name: 'myActiveURLs' })

export class ActiveURLsPipe implements PipeTransform {
  public transform(value, args: string[]): any {
    return value.replace(
      /http(s)?:\/\/\S+/ig,
      (item) => { return `<a target="_blank" href="${item}">${item}</a>`; }
    );
  };
}
