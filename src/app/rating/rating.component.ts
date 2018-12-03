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
  @Input() email: string;
  @Input() realName: string;
  @Input() disabled: boolean;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  
  
 
  
  ngOnInit() {
    
  }
  onClick(rating: number): void {
    if(!this.disabled) {
    this.rating = rating;
    this.ratingClick.emit({ 
      name: this.realName,
      rating: rating,
      question: this.question,
      email: this.email
    });
    }
  }

  

  ngAfterViewInit() {

    
  }

  constructor() {
    
   }

  

}
