import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { IRegister } from '../../core/interfaces/iregister';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ReactiveFormsModule,ButtonModule,MessagesModule,ToastModule, RippleModule,NgxSpinnerModule ],
  providers: [MessageService],
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
    private _messageService: MessageService,
    private spinner: NgxSpinnerService,
    private _router: Router) {
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
    this.spinner.show();        
    this._authService.register(data).subscribe({
      next:(response)=> {
        if(response.id) {
          const {email, password} = data;
          this._authService.login({email, password}).subscribe((next) => {
            sessionStorage.setItem('token',response.id);
            setTimeout(() => {
              /** spinner ends after 1 seconds */
              this.spinner.hide();
              this.show('success','Success','Message Content');
            }, 1000);
            setTimeout(() => {
              /** spinner ends after 2 seconds */
              this._router.navigate(['home']);
            }, 2000);
          // this.show('success','Success','Message Content');
          })
        }


      },
      error:(err) =>{this.show('error','Error',err.error.error);
        this.spinner.hide();
       }
    })
  }

  show(severity: string,summary : string, detail: string) {
      this._messageService.add({ severity: severity, summary: summary, detail: detail });
  }

}
