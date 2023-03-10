import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'rawHtml', pure: false })
export class RawHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {

    }

    transform(content: string) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}
