import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./loginpage.component.scss'],
})

export class loginComponent {
    modal = null
    constructor(private modalService:NgbModal, private SessionService:SessionService) {
      this.openModal()
    }

    openModal() {
        this.modal = this.modalService.open(LoginComponent,{})
    }
}


@Component({
    selector: 'app-loginpage',
    templateUrl:'./loginpage.component.html',
    styleUrls: ['./loginpage.component.scss'],
    providers:[NgbModalConfig,NgbModal]
})

export class LoginComponent implements OnInit, OnDestroy{
    loginForm: FormGroup
    login_err: boolean = false

    constructor(private SocketService: SocketService,
                private sessionService: SessionService,
                private modalService:NgbModal,
                private router:Router,
                ) {

    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'password': new FormControl(null, Validators.required)
        })
    }

    //handle user login with socket
    loginClicked() {
        if (!(sessionStorage.getItem('username'))) {
            let credentials = {
                email: this.loginForm.get('username').value,
                password: this.loginForm.get('password').value
            }

            this.SocketService.emit('login', credentials, (data: any) => {
                if (data.err || data === '') {
                    console.log(data.err)
                    this.login_err = true
                    this.loginForm.get('password').reset()
                }
                else if (data.res) {
                    sessionStorage.setItem('username', data.res)
                    localStorage.setItem('username', data.res)
                    this.modalService.dismissAll()
                    this.sessionService.session()
                    console.log(sessionStorage.getItem('username'))
                } else {
                    console.log('login fini')
                }
            })
        } else {
            sessionStorage.removeItem('username')
            this.loginClicked()
        }
    }
    
    ngOnDestroy(){
        this.router.navigate(['/'])
    }
}
