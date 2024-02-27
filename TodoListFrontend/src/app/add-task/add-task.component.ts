import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  taskName: string = '';
  taskStatus: string = 'ongoing';

  @Output() taskAdded: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  addTask() {
    const newTask = {
      id: Math.floor(Math.random() * 1000), // Generate random task ID
      name: this.taskName,
      status: this.taskStatus
    };
    
    // Send POST request to API endpoint
    this.http.post('http://localhost:5290/api/tasks', newTask)
      .subscribe(
        (response: any) => {
          // Emit the newly added task
          this.taskAdded.emit(newTask);
          this.taskName = ''; // Clear the input after adding task
        },
        (error: any) => {
          console.error('Error adding task:', error);
        }
      );
  }
}