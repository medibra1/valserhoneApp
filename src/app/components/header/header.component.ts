import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company, Service } from 'src/app/models/slider';
import { MainService } from 'src/app/services/main.service';

//declare function navMobileToggle(): any;
//declare function navLinks(): any;
//declare function globalJs(): any  ;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //navbarOpen = false;
   company!: Company;
   companySub!: Subscription;
   public services!: Service[];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    //navMobileToggle();
    //navLinks();
    //globalJs();
    this.companySub = this.mainService.companySubj.subscribe({
      next: data => {
        this.company = data;
      }
    })

    this.mainService.getServices().subscribe({
      next: (data: Service[]) => {
        this.services = data
      },
      error: err=>{console.log(err)}
    });


  }
 
   /* toggleNavbar() {   
    this.navbarOpen = !this.navbarOpen;
  }  */


}
