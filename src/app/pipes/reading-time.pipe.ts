import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readingTime' })
export class ReadingTimePipe implements PipeTransform {

    transform(value: any, ..._args: any[]): any {
        if (!value) {
            return '';
        }

        const totalWords = value.split(' ').length;
        const wordsPerMinute = 150;

        return Math.round(totalWords / wordsPerMinute) + ' min read';
    }
}
