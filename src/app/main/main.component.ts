import { Component, OnInit, ViewChild, AfterViewInit,EventEmitter, Input, Output } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { DataService } from 'app/services/data.service';
import { ToastrService } from 'ngx-toastr';

declare const $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    listsorder:any = [];
    checklist:boolean = false;
    totalprice:number;
    price:number = 0;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor( public location: Location, private router: Router,private data:DataService,private toastr:ToastrService) {
        this.data.dataChange.subscribe(v=>{
            this.listsorder.push(v);
            if(this.listsorder[0] != ""){
                this.checklist = true;
                this.toastr.info('Đã thêm vào giỏ hàng', '',{
                    progressBar: true,
                    positionClass: 'toast-bottom-right',
                  });
            }
            this.price = Number.parseInt(v.price);
            console.log(this.totalprice);
            this.totalprice = this.totalprice + this.price;
            console.log(this.totalprice);
            
       
      })
    }

    ngOnInit() {
        this.totalprice = 0;
        this.listsorder = [];
        this.listsorder.splice(0,1);

        $.material.init();
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
         this.router.events.subscribe((event:any) => {
            this.navbar.sidebarClose();
            if (event instanceof NavigationStart) {
               if (event.url != this.lastPoppedUrl)
                   this.yScrollStack.push(window.scrollY);
           } else if (event instanceof NavigationEnd) {
               if (event.url == this.lastPoppedUrl) {
                   this.lastPoppedUrl = undefined;
                   window.scrollTo(0, this.yScrollStack.pop());
               } else
                   window.scrollTo(0, 0);
           }
        });
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
             elemMainPanel.scrollTop = 0;
             elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    isMaps(path){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path == titlee){
            return false;
        }
        else {
            return true;
        }
    }
    runOnRouteChange(): void {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const ps = new PerfectScrollbar(elemMainPanel);
        ps.update();
      }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    onActivate(component) {
        console.log(component);
      }
}
