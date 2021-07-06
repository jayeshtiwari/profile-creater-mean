import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;
  constructor(
    private formBuilder : FormBuilder
  ) { }

  createForm(){
    this.form = this.formBuilder.group({
      email:['' , Validators.required],
      mobile:'',
      password:'',
      confirm:''
    })
  }
  ngOnInit(): void {
    this.createForm();
  }
  onRegister(){
    console.log(this.form);
    console.log(this.form.controls.email.errors)
  }

}
