import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data: BehaviorSubject<any> = new BehaviorSubject(moment());
  changeMonth(dir:number){
    const value = this.data.value.add(dir, 'month');
    this.data.next(value);
  }

  changeDate(date: moment.Moment){
    const value = this.data.value.set({
      date: date.date(),
      month: date.month()
    })
    this.data.next(value)
  }
}
