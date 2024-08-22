import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent {
  msg:string;
  students:string[]
  showMsg: boolean
  constructor(){
    this.msg = "Angular is Bad";
    this.students=["Harsh", "Akash"]
    this.showMsg = true;
  }

  sayHello():void{
    alert("Hello")
  }

  toggleShow(){
    this.showMsg = !this.showMsg
  }

}
