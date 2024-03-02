import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Task } from '../../models/Task';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports:[FormsModule, HttpClientModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnChanges{
  taskName: string = '';
  taskStatus: string = '';
  @Input() task: Task | null = null;
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editTaskClicked: EventEmitter<Task | null> = new EventEmitter<Task | null>();
  @Input() isEditMode: boolean = false;
  @Input() selectedTaskToEdit: Task | null = null;


  constructor(private taskService: TaskService) {}

  ngOnChanges(): void {
    if (this.task) {
      this.taskName = this.task.name;
      this.taskStatus = this.task.status;
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }
  }

  addOrEditTask(): void {
    if (!this.taskName.trim() || !this.taskStatus) {
      alert('Please enter both task name and status.');
      return;
    }

    if (this.task) {
      // Editing existing task
      const editedTask: Task = { ...this.task, name: this.taskName, status: this.taskStatus };
      this.taskService.updateTask(editedTask).subscribe(
        () => {
          console.log('Task updated successfully:', editedTask);
          this.editTaskClicked.emit(); // Emit event after task is edited
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating task:', error);
          alert('An error occurred while updating the task. Please try again.');
        }
      );
    } else {
      // Adding new task
      const newTask: Task = { id: 0, name: this.taskName, status: this.taskStatus }; // Assign a unique ID as needed
      this.taskService.addTask(newTask).subscribe(
        () => {
          console.log('Task added successfully:', newTask);
          this.taskAdded.emit(); // Emit event after task is added
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding task:', error);
          alert('An error occurred while adding the task. Please try again.');
        }
      );
    }
  }

  resetForm(): void {
    this.task = null;
    this.taskName = '';
    this.taskStatus = '';
  }

}