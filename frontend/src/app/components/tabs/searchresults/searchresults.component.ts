import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { tab } from 'src/app/models/tab.model'
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit, OnDestroy {
  url :string = null
  openTab: tab

  private returnTab: Subscription
  constructor(
    private map: MapService,
    private SearchService: SearchService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.returnTab = this.SearchService.searchTab.subscribe((tab)=> this.openTab = tab)
    this.url = this.router.url.replace('/search/','')
    this.SearchService.enterSearch(this.url,this.SearchService.mainSearch(this.url,this.map.getCenter(),0))
  }


  ngOnDestroy(){
    this.returnTab.unsubscribe()
  }
}
