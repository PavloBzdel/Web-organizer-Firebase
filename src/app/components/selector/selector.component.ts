import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(public dataService: DataService) { }

  change(dir:number){
    this.dataService.changeMonth(dir)
  }
  ngOnInit(): void {
  }

}
