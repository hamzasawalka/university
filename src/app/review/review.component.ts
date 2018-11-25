import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Custom
import { AppComponent } from '../app.component';
import { QuestionsService } from '../questions.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  ///////////////
  rating = 0;

  /////////////////

  currentRate = 0;
  route: string;
  isStudent: boolean;

  public name: string = '';
  public realName: string = this.questionsService.name;
  
  public ratings: any[] = [];
  student;

  public questions = this.appComponent.questionsService.getAllAnswers();

  

  // All students
  public allStudents = this.questionsService.allStudents;

  getKeys(obj) {
    return Object.keys(obj);
  }

  // Shared functions
  questionExists() {
    if (this.questions[0] == '1') {
      return false;
    } else {
      return true;
    }
  }

  // Student functions
  

  

  

  // Teacher functions
  

  ratingComponentClick(clickObj: any): void {
    var student = this.questionsService.getStudent(clickObj.name);
    student.answers[clickObj.question].grade = clickObj.rating;
    this.questionsService.updateLocal(false, student);
  }

  

  getRating(event) {
    console.log(event)
  }

  ////////////////////

  constructor(location: Location, router: Router,
    public appComponent: AppComponent,
    public questionsService: QuestionsService
  ) {
    this.realName = this.questionsService.name;
    router.events.subscribe((val) => {
      if (location.path().slice(0, 2) == '/s') {
        this.route = 'student';
        this.isStudent = true;

      } else if (location.path().slice(0, 2) == '/t') {
        this.route = 'teacher';
        this.isStudent = false;
      }
    });

    

  }

  ngOnInit() {
    
  }

}
