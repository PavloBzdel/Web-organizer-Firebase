import { TasksService } from './../../shared/tasks.service';
import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  tasks: Task[] = [];
  constructor(public dataService: DataService, public tasksService: TasksService) {}

  ngOnInit(): void {
    this.dataService.data.pipe(
      switchMap( value => this.tasksService.load(value))
    ).subscribe(tasks =>{
      this.tasks = tasks
    })
  }
  submit() {
    const { title } = this.form.value;
    const task:Task = {
      title,
      date: this.dataService.data.value.format('DD-MM-YYYY')
    }
    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, err => console.error(err))
  }

  remove(task : Task){
    this.tasksService.remove(task).subscribe( () => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }), (err: any) => console.error(err)
  }
}
