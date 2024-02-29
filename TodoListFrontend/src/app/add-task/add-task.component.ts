import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports:[FormsModule, HttpClientModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Input() taskName: string = '';
  @Input() taskStatus: string = '';
  @Input() taskId: number | null = null; // taskId is now an input property
  @Output() taskAdded: EventEmitter<any> = new EventEmitter();
  @Input() mode: 'add' | 'edit' = 'add';
  constructor(private http: HttpClient) {}

  addTask() {
    if (this.taskName && this.taskStatus) {
      if (this.taskId) {
        // If taskId is provided, update existing task
        this.updateTask();
      } else {
        // If taskId is not provided, add new task
        this.createNewTask();
      }
    }
  }

  updateTask() {
    const updatedTask = {
      id: this.taskId,
      name: this.taskName,
      status: this.taskStatus
    };
    this.http.put(`http://localhost:5290/api/tasks/${this.taskId}`, updatedTask)
      .subscribe(
        () => {
          console.log('Task updated successfully');
          this.taskAdded.emit(updatedTask);
          this.resetForm();
        },
        error => {
          console.error('Error updating task:', error);
        }
      );
  }

  createNewTask() {
    const newTask = {
      name: this.taskName,
      status: this.taskStatus
    };
    this.http.post('http://localhost:5290/api/tasks', newTask)
      .subscribe(
        (response: any) => {
          console.log('Task added successfully');
          this.taskAdded.emit(response); // Emit the newly added task
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding task:', error);
        }
      );
  }

  resetForm() {
    this.taskName = '';
    this.taskStatus = 'ongoing';
    this.taskId = null;
  }
}