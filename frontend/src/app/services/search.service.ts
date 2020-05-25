import { MapService } from 'src/app/services/map/map.service';
import { tab } from './../components/sidebar/tab.model';
import { search } from '../components/sidebar/header/tabs/searchresults/search/search.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoursquareService } from './map/foursquare.service';
import { SocketService } from './chatsystem/socket.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnDestroy {

  private openTabs: Array<tab> = [{title: 'Home',path:'home'}, {title: 'Discover',path:'discover'},
    {title: 'My Trip', path:'mytrip'}, {title: 'My Account', path: 'myaccount'}]
  private _searchTabs: BehaviorSubject<any> = new BehaviorSubject(this.openTabs)
  public searchTabs: Observable<any> = this._searchTabs.asObservable()

  private returnSearch: Array<search> = []
  private _searchResults: BehaviorSubject<any> = new BehaviorSubject(this.returnSearch)
  public searchResults: Observable<any> = this._searchResults.asObservable()

  private mapCenterSub: Subscription
  mapCenter: string

  constructor(private HttpClient: HttpClient,
              private SocketService: SocketService,
              private foursquareService: FoursquareService,
              private MapService: MapService) {
  }


  foursquareSearch(query: string, latLng: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.foursquareService.onSendRequest(query, latLng)
      .subscribe((result) => {
        resolve(result)
      }, (err) => {
        reject(err)
      })
    })
  }

  userSearch(value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.HttpClient.get<any>(environment.travelnet.searchUsers,
        {
          headers: {
            authorization: localStorage.getItem('token')? localStorage.getItem('token').toString() : 'monkas',
          },
          params: {
            user: value
          }
        }
      )
      .subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err)
      })
    })
  }

  async mainSearch(query: string, latLng: string): Promise<any> {
    return await Promise.all([this.foursquareSearch(query, latLng), this.userSearch(query)])
  }

  // when user opens new tab
  newSeach(query: string,latLng:string) {
    this.returnSearch = []
    this._searchResults.next([])
    this.openTabs.push({
      title: query,
      path: 'searchresults',
      content: 'Loading'
    })
    this._searchTabs.next(this.openTabs)
    this.mainSearch(query, latLng)
    .then(result => {
      if (!result[0].response.warning){
      result[0].response.groups[0].items.forEach( venue =>{
        this.returnSearch.push({'type':'venue','name' : venue.venue.name})
      })
      if (sessionStorage.getItem('username'))
        if (result[1].users){
          result[1].users.forEach(user=>{
            this.returnSearch.push({'type' : 'User', 'name' : user.name})
          })
        }
        else{
          this.returnSearch.push({'type' : 'warning', 'name' : 'You must be logged in to see users'})
        }
    }
    console.log(this.returnSearch)
      this._searchResults.next(this.returnSearch)
      this._searchTabs.next(this.openTabs)
    })
    .catch(err => {
      console.log(err)
    })

  }
  getSearchResult(search){
    if (search.type == 'venue'){
      return ('venue: ' + search.name)
    }
    else{
      return ('User: ' + search.name)
    }
  }
  resetSearch(){
    this.returnSearch = []
    this._searchResults.next([])
  }
  deleteTab(i:number){
    this.openTabs.splice(i,1)
    this._searchTabs.next(this.openTabs)
  }

  ngOnDestroy() {
    this.mapCenterSub.unsubscribe()
    this._searchResults.next([])
    this._searchResults.unsubscribe()
  }
}
