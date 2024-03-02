
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task } from '../../models/Task';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-display-task',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './display-task.component.html',
  styleUrl: './display-task.component.css'
})
export class DisplayTaskComponent {
  @Input() tasks: Task[] = [];
  @Output() taskToEdit: EventEmitter<Task> = new EventEmitter<Task>();
  

  constructor(private taskService: TaskService) {}

  editTask(task: Task): void {
    this.taskToEdit.emit(task);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId.toString()).subscribe(() => {
      // Filter out the deleted task from the tasks array
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }
}