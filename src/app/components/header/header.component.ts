import { Component, OnInit } from '@angular/core';

//declare function navMobileToggle(): any;
//declare function navLinks(): any;
declare function globalJs(): any  ;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  currentIsClicked = false;
  notClicked = false;

  constructor() { }

  ngOnInit(): void {
    //navMobileToggle();
    //navLinks();
    globalJs();

  }
  
   /* toggleNavbar() {   
    this.navbarOpen = !this.navbarOpen;
  }  */


}
