import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/models/slider';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  windowScrolled = false;

  public currentYear = new Date().getFullYear();
  companySub!: Subscription;
  company!: Company;

  constructor(private mainService: MainService) { }

  /* @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
        }
      } */

  ngOnInit(): void {
    this.companySub = this.mainService.companySubj.subscribe({
      next: data => {
        this.company = data;
      }
    })
}

}
