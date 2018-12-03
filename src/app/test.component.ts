import { Component } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'test',
  template: `
  <table>
    <tr>
        <td>2</td><td>+</td><td>2</td><td>=</td><td></td>
    </tr>
    <tr>
        <td>4</td><td>+</td><td>10</td><td>=</td><td></td>
    </tr>
    <tr>
        <td>8</td><td>+</td><td>14</td><td>=</td><td></td>
    </tr>
</table>
  `,
  styleUrls: ['./app.component.css']
})
export class test {
  title = 'university';



  constructor() { }

  ngOnInit() {

    function operation(val1, op, val2) {
        var num1 = parseFloat(val1);
        var num2 = parseFloat(val2);
        if(op == '+') {
            return num1 + num2
        } else
        if(op == '-') {
            return num1 - num2
        } else
        if(op == 'x' || op == '*') {
            return num1 * num2
        } else
        if(op == '/') {
            return num1 / num2
        }

    }



        

         
         
         for(var i = 1; i < $('tbody').children().length + 1; i++){
            $('tbody :nth-child(' + i + ') :last-child').html(
                operation(
                    $('tbody :nth-child(' + i + ') :first-child').html(),
                    $('tbody :nth-child(' + i + ') :nth-child(2)').html(), 
                    $('tbody :nth-child(' + i + ') :nth-child(3)').html() 
                            )
                )
         }
                

               
               
        
  }

}
