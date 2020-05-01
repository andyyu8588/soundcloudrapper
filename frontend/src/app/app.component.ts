import { SocketService } from 'src/app/services/socket.service';
import { SessionService } from './services/session.service';
import { RoomWidget } from './components/friendlist/friend/Room_Widget.model';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FriendlistService } from './services/friendlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck, OnInit {

  currentFeature:string
  title = 'frontend';
  sessionState: boolean
  user = sessionStorage.getItem('username')
  openChatWidgets: any
  windowHeight: number = window.innerHeight

  constructor(
    private FriendlistService: FriendlistService,
    private SessionService: SessionService,
    private SocketService: SocketService){

    localStorage.getItem('username')? 
    this.SocketService.emit('updateLogin', {username: localStorage.getItem('username')}, (data) => {
      if(data.res){
        sessionStorage.setItem('username', data.res)
        SessionService.session()
      } else if (data.err){
        console.log(data.err)
      }
    })
    : {}

    let openChatWidgets_sub = this.FriendlistService.openWidgets.subscribe(x => this.openChatWidgets = x)
    this.SessionService.session()
    let y = this.SessionService.sessionState.subscribe(x => {
      this.sessionState = x
      if (this.sessionState) {
        // this.FriendlistService.getNotifications()
      }
    })
    let x = this.SessionService.currentFeature.subscribe(x => this.currentFeature = x)
  }

  onNavigate(feature: any) {
    this.currentFeature = feature;
  }

  ngOnInit() {
    // this.FriendlistService.getNotifications()
  }

  ngDoCheck() {
    // console.log(this.sessionState)
  }

  resizeWindow(){
    this.windowHeight = window.innerHeight
    this.FriendlistService.resizeWindow(window.innerWidth)
  }
}
