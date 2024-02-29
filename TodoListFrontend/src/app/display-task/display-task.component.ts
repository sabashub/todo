import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from '../add-task/add-task.component';
@Component({
  selector: 'app-display-task',
  standalone: true,
  imports: [ CommonModule, FormsModule, AddTaskComponent],
  templateUrl: './display-task.component.html',
  styleUrl: './display-task.component.css'
})
export class DisplayTaskComponent implements OnInit {
  tasks: any[] = [];
  isDataLoaded: boolean = false;
  selectedTask: any | null = null;
  mode: 'add' | 'edit' = 'add';
  editingTaskIndex: number | null = null;
   
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<any[]>('http://localhost:5290/api/tasks').subscribe(
      (tasks: any[]) => {
        this.tasks = tasks;
        this.isDataLoaded = true; // Set flag to indicate data is loaded
      }
    );
  }

  editTask(task: any) {
    // Set the selected task for editing
    this.selectedTask = task;
    this.mode = 'edit';
    this.editingTaskIndex = this.tasks.indexOf(task);
    
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
    // Add or update the task in the list
    const index = this.tasks.findIndex(task => task.id === newTask.id);
    if (index !== -1) {
      this.tasks[index] = newTask; // Update existing task
    } else {
      this.tasks.push(newTask); // Add new task
    }
    this.selectedTask = null; // Reset selected task
    this.mode = 'add';
    this.editingTaskIndex = null;
  }
}