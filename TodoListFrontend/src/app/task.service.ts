import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task'; // Update the path

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5290/api/tasks'; // Update the API URL

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  deleteTask(taskId: string): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }
  updateTask(updatedTask: Task): Observable<Task>{
  if (!updatedTask) {
    // If updatedTask is null, return an observable that completes immediately
   
  }
  
  const url = `${this.apiUrl}/${updatedTask.id}`;
  return this.http.put<Task>(url, updatedTask);
}
   addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask);
  }
}