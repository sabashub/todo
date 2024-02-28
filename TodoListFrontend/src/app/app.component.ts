import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { NgModule } from '@angular/core';
import { DisplayTaskComponent } from './display-task/display-task.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, DisplayTaskComponent],
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  

}