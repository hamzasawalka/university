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
  public realName: string = '';
  public ratings: any[] = [];
  student;

  public questions = this.appComponent.questionsService.getQuestions();

  // This student
  public thisAnsweredQuestions = [];



  // All students
  public allStudents = this.questionsService.allStudents;



  // Shared functions
  questionExists() {
    if (this.questions[0] == '1') {
      return false;
    } else {
      return true;
    }
  }

  // Student functions
  

  

  getStudent(name) {
    var student = this.questionsService.allStudents.find(function(e){
      return e.name == name;
    })
    this.student = student;
    return student;
  }

  // Teacher functions
  

  ratingComponentClick(clickObj: any): void {

    for(var i = 0; i < this.allStudents.length; i++) { 
      if(this.allStudents[i].name == clickObj.name) {  
        for(var j = 0; j < this.allStudents[i].answers.length; j++) {
          if (this.allStudents[i].answers[j].question == clickObj.question ) {
            this.allStudents[i].answers[j].grade = clickObj.rating;
            
          }
        }
      }
    }  
    this.questionsService.updateLocal(false, false);
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
