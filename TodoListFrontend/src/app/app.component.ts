import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { DisplayTaskComponent } from './display-task/display-task.component';
import { Task } from '../models/Task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, DisplayTaskComponent],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tasks: Task[] = [];
  tasksLoaded: boolean = false;
  selectedTask: Task | null = null;
  isEditMode: boolean = false
  tasksLength: number = this.tasks.length

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
    console.log(this.isEditMode)
  }

  fetchTasks(): void {
    this.tasksLoaded = false;
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        this.tasksLoaded = true;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
        // Handle error
      }
    );
    console.log(this.tasks)
  }

  onTaskAdded(task: Task): void {
    this.tasks.push(task);
    this.tasksLoaded = true;
    this.fetchTasks();
  }

  editTask(task: Task | null): Task | null {
    this.isEditMode = true;
    return this.selectedTask = task;
    
  }

}