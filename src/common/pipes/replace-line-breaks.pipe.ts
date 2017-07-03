import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myReplaceLineBreaks' })

export class ReplaceLineBreaksPipe implements PipeTransform {
  public transform(value, args: string[]): string {
    return value.replace('\n', '<br>');
  };
}
