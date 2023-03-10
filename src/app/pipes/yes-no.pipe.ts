import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yesNo' })
export class YesNoPipe implements PipeTransform {

    constructor() {

    }

    transform(value: boolean, yes: string = 'Yes', no: string = 'No') {
        return value ? yes : no;
    }
}
