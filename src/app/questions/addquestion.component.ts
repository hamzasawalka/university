import { Component, OnInit } from '@angular/core';

// Custom
import { QuestionsService } from '../questions.service';
import { question } from '../question-interface';


@Component({
    selector: 'add-question',
    template: `
    <textarea (keyup)="type($event)" name="question" > </textarea>
    <button (click)="add()">Add</button>
    `,
    styles: [`
    textarea {
        width: 400px;
    }
    `]
  })
  export class AddQuestion implements OnInit {

    
    
    question: question ;

    type(event: any) {
        this.question.question = event.target.value;
    }

    add() {
        console.log( this.question )
        this.questionsService.addQuestion(this.question);
    }
  
    constructor(public questionsService: QuestionsService) {
        this.question={
            question:'',
            answers:[],
        }
     }
  
    ngOnInit() {
    }
    
    

  }
  