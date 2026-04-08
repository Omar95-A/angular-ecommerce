import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Route, Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { UserDataService } from '../../core/services/user-data.service';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, ToastModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  providers: [MessageService]
})
export class UserNavComponent implements OnInit {
    items: MenuItem[] | undefined;
    items_user: MenuItem[] | undefined;
    userName: string =''
    cartNum: number = 0;

    constructor(private messageService: MessageService, private _userdata: UserDataService, private _authService: AuthService, private _router: Router) {}

    ngOnInit() {
        this.getName();
        this.getUserCountCart();
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                path: 'home'
            },
            {
                label: 'Products',
                icon: 'pi pi-tags',
                path: 'products'
            },
            {
                label: 'Category',
                icon: 'pi pi-th-large',
                path: 'category'
            },

        ];
        this.items_user = [
            {
                label: this.userName,
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-address-book',
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.logOut();
                        }
                    }
                ]
            }

        ];
    };
    
    getName() {
        this._userdata.userName.subscribe((next) => {this.userName = next});
    }

    getUserCountCart() {
        const id = sessionStorage.getItem('toke') || '';
        this._userdata.getCountCart(id).subscribe((next) => this.cartNum = next.length);
    }

    logOut() {
        this._authService.logout().subscribe((next)=> {
            sessionStorage.removeItem('token');
            this._router.navigate(['login']);
        })

    }
}
