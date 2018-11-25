import { Component, OnInit } from '@angular/core';

// Custom
import { QuestionsService } from '../questions.service';



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

    
    
    question: string = '' ;

    type(event: any) {
        this.question = event.target.value;
        this.questionsService.question = event.target.value;
    }

    add() {
        console.log( this.question )
        this.questionsService.addQuestion(this.question);
    }
  
    constructor(public questionsService: QuestionsService) {
        
     }
  
    ngOnInit() {
    }
    
    

  }
  