import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() question: string;
  @Input() name: string;
  @Input() realName: string;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  
  
 
  
  ngOnInit() {
    
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({ 
      name: this.realName,
      rating: rating,
      question: this.question
    });
  }

  

  ngAfterViewInit() {

    
  }

  constructor() {
    
   }

  

}
