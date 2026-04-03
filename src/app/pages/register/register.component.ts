import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ReactiveFormsModule,ButtonModule,MessagesModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
  
  name!:FormControl;
  email!:FormControl;
  password!:FormControl;
  cfpassword!:FormControl;
  RegisterForm!:FormGroup;

  constructor() {
    this.initFormControl();
    this.creatFormGroup();
  }

  // messages!: Message[];
  // ngOnInit() {
  //     this.messages = [{ severity: 'error', summary:'Error', detail: 'User Name Field is Required' }];
  // }

  initFormControl() {
    this.name= new FormControl('',[Validators.required,Validators.maxLength(5)]);
    this.email= new FormControl('',[Validators.required,Validators.email]);
    this.password= new FormControl('',[Validators.required]);
    this.cfpassword= new FormControl('',[Validators.required,this.passwordMatch(this.password)]);
  }
  creatFormGroup() {
    this.RegisterForm = new FormGroup({
      name:this.name,
      email:this.email,
      password:this.password,
      cfpassword:this.cfpassword
    })
  }
  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (repass: AbstractControl): null | {[key: string]: boolean} => {
      if (pass.value !== repass.value) {
        return {passNotMatch: true}
      } else return null
    }
  }

  submit() {
    console.log(this.RegisterForm)
  }
}
