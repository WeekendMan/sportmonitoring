import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myMetatags' })

export class MetatagsPipe implements PipeTransform {
  public transform(value, args: string[]): string {
    let newValue: string;

    newValue = value.replace(
      /(\s|↵){1}(@|#){1}[\w_]+/ig,
      (item) => {
        item = item.trim();

        if (item.substr(0, 1) === '↵') {
          item = item.substr(1, item.length - 1);
        }

        if (item.substr(0, 1) === '#') {// if hashtag - #someHashtag
          return ` <a target="_blank" href="https://twitter.com/search?q=${encodeURIComponent(item)}">${item}</a> `;
        } else {// username - @someUser
          return ` <a target="_blank" href="https://twitter.com/${encodeURIComponent(item.substr(1, item.length - 1))}">${item}</a> `;
        }
      }
    );

    return newValue;
  };
}
