import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import * as Tabulator from 'tabulator-tables';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() studentsObjs;

  @Output() scoreChange = new EventEmitter();

  constructor(
    public qs: QuestionsService
  ) { }

  ngOnInit(): void {
    
    const that = this;
    this.studentsObjs.forEach(e => {
      let keys = Object.keys(e.answers);
      e.answers = this.toArray(e.answers)
      let avg = 0;
      e.answers.forEach((a, i) => {
        if (a !== true) {
          avg += a.score
          a['question'] = keys[i];
        }
      });
      e.score = e.answers.length > 1 ? avg / (e.answers.length - 1) : 0
      this.qs.renameProperty(e, 'answers', '_children')
    });

    let table = new Tabulator("#example-table", {
      cellEdited: (cell) => {
        if (cell._cell.row.data.question != undefined) {
          let name = cell._cell.row.modules.dataTree.parent.data.name;
          let email = cell._cell.row.modules.dataTree.parent.data.email;
          let question = cell._cell.row.data.question;
          let oldScore = cell._cell.oldValue
          let score = cell._cell.value;
          // Update database
          that.qs.scoreStudent(email, question, score);
          that.scoreChange.emit({ name: name, old: oldScore, new: score });
        }
      },
      layout: "fitColumns",
      height: "fit-content",
      data: this.studentsObjs,
      dataTree: true,
      dataTreeStartExpanded: false,
      dataTreeChildIndent: 15,
      columns: [
        { title: "Name", field: "name", width: 200, responsive: 0 },
        { title: "Email", field: "email", width: 150 },
        { title: "Question", field: "question", widthGrow: 3, responsive: 2 },
        { title: "Answer", field: "answer", width: 150, responsive: 2 },
        { title: "Score", field: "score", formatter: "star", editor: true, width: 150, responsive: 2 },
      ],
    });
  }

  toArray(obj) {
    let keys = Object.keys(obj);
    let arr = [];
    keys.forEach(e => {
      arr.push(obj[e])
    });
    return arr;
  }

  





}
