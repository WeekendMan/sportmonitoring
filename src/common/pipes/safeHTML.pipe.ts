import { PipeTransform, Pipe, SecurityContext } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'mySafeHTML' })

export class SafeHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(value, args: string[]): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  };
}
