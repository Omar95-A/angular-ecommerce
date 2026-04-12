import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { Ilogin, IRegister } from '../../core/interfaces/iregister';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { Route, Router } from '@angular/router';
import { UserDataService } from '../../core/services/user-data.service';
import { NotificationsService } from '../../core/services/notifications.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ReactiveFormsModule,ButtonModule,MessagesModule,ToastModule, RippleModule,NgxSpinnerModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  email!:FormControl;
  password!:FormControl;
  LoginForm!:FormGroup;

  constructor(private _authService: AuthService, 
    private _notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private _userdata: UserDataService) {
    this.initFormControl();
    this.creatFormGroup();
  }

  // messages!: Message[];
  // ngOnInit() {
  //     this.messages = [{ severity: 'error', summary:'Error', detail: 'User Name Field is Required' }];
  // }

  initFormControl() {
    this.email= new FormControl('',[Validators.required,Validators.email]);
    this.password= new FormControl('',[Validators.required]);
  }
  creatFormGroup() {
    this.LoginForm = new FormGroup({
      email:this.email,
      password:this.password,
    })
  }

  submit() {
    if(this.LoginForm.valid){
      this.SiginInApi(this.LoginForm.value); 
    } else {
      this.LoginForm.markAsTouched();
      Object.keys(this.LoginForm.controls).forEach((c)=> this.LoginForm.controls[c].markAsDirty());
    }
  }

  SiginInApi(data: Ilogin) {  
    this.spinner.show();        
    this._authService.login(data).subscribe({
      next:(response)=> {
        if(response.id) {
          this._userdata.userName.next(response.name);
          sessionStorage.setItem('token',response.id);
          setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.spinner.hide();
            this._notificationsService.showSuccess('Success','Message Content');
          }, 1000);
          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this._router.navigate(['home']);
          }, 2000);
          // this.show('success','Success','Message Content');
        }


      },
      error:(err) =>{this._notificationsService.showError('Error',err.error.error);
        this.spinner.hide();
       }
    })
  }


}
