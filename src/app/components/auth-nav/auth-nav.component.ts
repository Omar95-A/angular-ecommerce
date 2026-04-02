import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Login',
                icon: 'pi pi-sign-in',
                path: 'login'
            },
            {
                label: 'Register',
                icon: 'pi pi-user-plus',
                path: 'register'
            }
        ];
    }
}
