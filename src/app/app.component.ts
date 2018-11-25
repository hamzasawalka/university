import { Component } from '@angular/core';

// Custom
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'university';



  constructor(public questionsService: QuestionsService) {

  }

}
