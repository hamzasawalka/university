import { Component, OnInit } from '@angular/core';

// Custom
import { QuestionsService } from '../questions.service';



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  students;
  allStudents;

  constructor(
    public questionsService: QuestionsService) { }

  
  
  ngOnInit() {
    this.students = this.questionsService.students;
    this.allStudents = this.questionsService.allStudents; 
  }

}
