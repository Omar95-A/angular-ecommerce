import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { IRegister } from '../../core/interfaces/iregister';
import { AuthService } from '../../core/services/auth.service';
import { RippleModule } from 'primeng/ripple';
import { NgxSpinnerService } from "ngx-spinner";
import {  Router } from '@angular/router';
import { UserDataService } from '../../core/services/user-data.service';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ReactiveFormsModule,ButtonModule,MessagesModule, RippleModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
  
  name!:FormControl;
  email!:FormControl;
  password!:FormControl;
  cfpassword!:FormControl;
  RegisterForm!:FormGroup;

  constructor(private _authService: AuthService, 
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private _userData: UserDataService) {
    this.initFormControl();
    this.creatFormGroup();
  }

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
      if (pass.value !== repass.value || repass.value === '') {
        return {passNotMatch: true}
      } else return null
    }
  }
  
  submit() {
    if(this.RegisterForm.valid){
      this.registerationApi(this.RegisterForm.value); 
    } else {
      this.RegisterForm.markAsTouched();
      Object.keys(this.RegisterForm.controls).forEach((c)=> this.RegisterForm.controls[c].markAsDirty());
    }
  }

  registerationApi(data: IRegister) {        
    this._authService.register(data).subscribe({
      next:(response)=> {
        if(response.id) {
          const {email, password} = data;
          this._authService.login({email, password}).subscribe((next) => {
            sessionStorage.setItem('token',response.id);
            this._userData.userName.next(response.name);
            this._notificationsService.showSuccess('Success','Account created successfully');
            this._router.navigate(['home']);
          })
        }
      },
      error:(err) =>{this._notificationsService.showError('Error',err.error.error);
       }
    })
  }

}
