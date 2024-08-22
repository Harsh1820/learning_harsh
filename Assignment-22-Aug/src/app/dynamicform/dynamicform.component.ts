import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SquareService } from '../square.service';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrl: './dynamicform.component.css'
})
export class DynamicformComponent {
contactForm : FormGroup;
constructor(private formBuilder: FormBuilder,
  private squareServiceObj: SquareService
){
  console.log(squareServiceObj.doSquare(6))
  this.contactForm = this.formBuilder.group({
    fullName: [""],
    email: [""],
    msg: [""]
  });
}

onSubmit(){
  console.log("Your form data : ", this.contactForm.value)
}
}
