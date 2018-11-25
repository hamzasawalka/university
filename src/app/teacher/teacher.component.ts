import { Component, OnInit } from '@angular/core';

// Custom
import { QuestionsService } from '../questions.service';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  
  constructor(public questionsService: QuestionsService) { }

  ngOnInit() {
  }

}
