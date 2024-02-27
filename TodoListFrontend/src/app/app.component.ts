import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  tasks: any[] = [];
  isDataLoaded: boolean = false;
  selectedTask: any | null = null; 
  editedTask: any = { id: 0, name: '', status: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<any[]>('http://localhost:5290/api/tasks').subscribe(
      (tasks: any[]) => {
        this.tasks = tasks;
        console.log(this.tasks);
        this.isDataLoaded = true; // Set flag to indicate data is loaded
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  editTask(task: any) {
    // Set the selected task for editing
    this.selectedTask = task;
    // Clone the task to avoid changing the original task object
    this.editedTask = { ...task };
  }

  cancelEdit() {
    // Clear the selected task and edited task
    this.selectedTask = null;
    this.editedTask = { id: 0, name: '', status: '' };
  }

  saveTask() {
    // Implement save logic here
    console.log('Saving task:', this.editedTask);
    // You can send a PUT request to update the task on the server
    // After successful update, update the task in the tasks array
    const index = this.tasks.findIndex(task => task.id === this.editedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...this.editedTask };
    }
    // Clear the selected task and edited task
    this.selectedTask = null;
    this.editedTask = { id: 0, name: '', status: '' };
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.http.delete(`http://localhost:5290/api/tasks/${task.id}`).subscribe(
        () => {
          console.log('Task deleted successfully');
        },
        error => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  onTaskAdded(newTask: any) {
    // Add the newly added task to the list
    this.tasks.push(newTask);
  }
}