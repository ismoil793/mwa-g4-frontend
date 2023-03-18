import { Component } from '@angular/core';

@Component({
  selector: 'app-my-automobiles',
  templateUrl: './my-automobiles.component.html',
  styleUrls: ['./my-automobiles.component.css']
})
export class MyAutomobilesComponent {

  myAutomobiles: {title:string, vin:string, type:string}[] = [ 
    {title:'auto1', vin:'123', type:'type1'},
    {title:'auto1', vin:'123', type:'type1'},
    {title:'auto1', vin:'123', type:'type1'},
    {title:'auto1', vin:'123', type:'type1'}
  ];

}
