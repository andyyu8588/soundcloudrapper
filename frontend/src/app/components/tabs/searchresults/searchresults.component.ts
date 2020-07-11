import { CategoryNode } from './../../../models/CategoryNode.model';
import { FilterComponent } from './../../filter/filter.component';
import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { tab } from 'src/app/models/tab.model'
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map/map.service';
import { greaterThanValidatorExtension } from '@rxweb/reactive-form-validators/validators-extension';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(FilterComponent) filter: FilterComponent

  url: string = null
  urlQuery: string = null
  urlLatLng: string = null
  openTab: tab
  filterNumber: number
  loading: boolean = true
  fakeCenter: any = null
  @Input() select: number


  private returnTab_sub: Subscription
  private filter_sub: Subscription
  private fakeCenter_sub: Subscription
  private selectedNodes_sub: Subscription
  selectedNodes: CategoryNode[]
  
  constructor(
    private map: MapService,
    private SearchService: SearchService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.SearchService.updateCategories()
    .then((arr: CategoryNode[]) => {
      this.selectedNodes = arr
    })
    this.returnTab_sub = this.SearchService.searchTab.subscribe((tab) => {
      console.log(tab)
      this.openTab = tab
    })
    this.filter_sub = this.SearchService.filterNumber.subscribe((number)=> this.filterNumber = number)
    this.fakeCenter_sub = this.SearchService.searchTab.subscribe((center)=> this.fakeCenter = center)
    this.url = this.router.url.replace('/search/','')
    this.urlQuery = this.url.split("&")[0]
    this.urlLatLng = this.url.split("&")[1]
    this.SearchService.enterSearch(this.urlQuery,this.SearchService.mainSearch(this.urlQuery,this.urlLatLng),this.urlLatLng).then(()=>{
      this.loading = false
    })
  }

  ngAfterViewInit() {
    // subscribe to changes in filter selection
    this.selectedNodes_sub = this.filter.selectedNodes.subscribe((node: CategoryNode) => {
      console.log(this.selectedNodes)
      if (node) {
        for (let x = 0; x < this.selectedNodes.length; x++) {
          // if finds one
          if (this.selectedNodes[x] == node) {
            this.selectedNodes.splice(x, 1)
            break
          }
          if (x == (this.selectedNodes.length-1) && this.selectedNodes[x] != node) {

          }
        }
      }
    })
  }

  checkChildName(node: CategoryNode): CategoryNode {
    
    return
  }

  checkFilter(type: number){
    // console.log(this.filterNumber)
    if (this.filterNumber === 0 || type === this.filterNumber){
      return true
    }
    else{
      return false
    }
  }

  // check if venue should be displayed
  checkVenueFilter(categoryName: Array<{[key: string]: any}>): boolean {
    // console.log(categoryName)
    let cat: CategoryNode[] = this.filter.categories
    if (!this.selectedNodes.length || !categoryName.length) {
      return true
    } else {
      return false  
    }
  }

  ngOnDestroy(){
    this.filter_sub.unsubscribe()
    this.returnTab_sub.unsubscribe()
    this.fakeCenter_sub.unsubscribe()
    this.selectedNodes_sub.unsubscribe()
  }
}
