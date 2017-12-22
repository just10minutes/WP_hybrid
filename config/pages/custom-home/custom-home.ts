import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, Content  } from 'ionic-angular';
import { WpApiPosts } from 'wp-api-angular';
import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';
import debug from 'debug';
const log = debug('CustomHomePage');
import { getNavParamsFromItem } from './../../../src/utils/item';
import { MenuMapping } from './../../../config/pages/';

/**
 * Generated class for the CustomHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custom-home',
  templateUrl: 'custom-home.html',
})
export class CustomHomePage {
  title: string;
  posts$: Observable<any>;
  slides:any;
  type: string;
  options: any;
  content: Content;
  _list: Array<any>;
 
   

  constructor(private wpApiPosts: WpApiPosts, public navCtrl: NavController,
  public cdRef: ChangeDetectorRef,) {
    

    //Get Latest 3 posts
    let uRLSearchParams = new URLSearchParams();
    uRLSearchParams.append('per_page', '3' );
    //uRLSearchParams.append('categories', '4');
    
    this.wpApiPosts.getList({ search: uRLSearchParams })
      .map(response => response.json()) 
      .subscribe(data => { 
        //console.log(data);
        this.slides = data; }) 

      //console.log(this.slides)
      this.title = 'Cooking Shooking';
  }
openPage = (e, item) => {
        let params = getNavParamsFromItem(this.type, item);
        log('about to open', `${this.type}Item`, params)
        this.navCtrl.push(MenuMapping[`${this.type}Item`], params)
    }
  trackBy = (index: number, item) => item.id;

    // http://stackoverflow.com/questions/41797590/angular-2-onpush-change-detection-for-dynamic-components
    set list(val: Array<any>) { this._list = val; this.cdRef.markForCheck(); }
    get list() { return this._list };

  ionViewDidLoad() {    
    console.log('ionViewDidLoad CustomHomePage');
  }

  
}
