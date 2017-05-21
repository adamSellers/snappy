import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * The days-ago pipe will take our date format from the photo
 * object and workout how many days ago that photo was created.
 * This is used in the 'x days ago' notification on the homepage.
 */
@Pipe({
  name: 'daysAgo',
})

@Injectable()
export class DaysAgoPipe implements PipeTransform {

  transform(value, args?) {
    let now = new Date(); //milliseconds since the epoch
    let oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    let diffDays = Math.round(Math.abs((value.getTime() - now.getTime())/(oneDay)));

    return diffDays;
  }

}
