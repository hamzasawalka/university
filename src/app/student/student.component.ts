import { Component, OnInit } from '@angular/core';

//Custom
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})


export class StudentComponent implements OnInit {

  public name;

  typeName(event: any) {
    this.name = event.target.value;
    this.questionsService.name = this.name;
  }

  constructor(public questionsService: QuestionsService) {
    this.name ='';
   }

  ngOnInit() {

  }

}
