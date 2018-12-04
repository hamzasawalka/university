import { Component, OnInit } from '@angular/core';

// Custom
import { QuestionsService } from '../questions.service';




@Component({
	selector: 'app-teacher',
	templateUrl: './teacher.component.html',
	styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
	questions;
	students;
	allStudents;

	constructor(
		public questionsService: QuestionsService) { }

	try(code: Function, stop: boolean) {
		const getData = setInterval(() => {
			code();
			if (stop) {
				clearInterval(getData)
			}
		}, 500)
	}

	ngOnInit() {

		this.try(() => {
			this.questions = this.questionsService.questions
		},
			this.questions != undefined
		);

		this.try(() => {
			this.students = this.questionsService.students
		},
			this.students != undefined
		)

	}

}
