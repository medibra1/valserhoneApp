import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Company, Portofolio, Service, Testimonial } from 'src/app/models/slider';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';


/* declare function swiper(): any;
declare function portfolioLightbox(): any;
declare function portfolioIsotopFilter(): any; */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit, OnDestroy {

  companySub!: Subscription;
  company!: Company;
  servicesSub!: Subscription;
  services!: Service[];
  testimonialsSub!: Subscription;
  testimonials!: Testimonial[];
  portofolioSub!: Subscription;
  portofolio!: Portofolio[];
  downloadPortofoImage = `${environment.api_url}/download-portofo/`
  public Downloadimage = `${environment.api_url}/download-testimo`;
  contactForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: any;
  public desableContactBtn = false;

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  showNavigationArrows = false;
  showNavigationIndicators = true;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = false;
  //images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/400/400`);
  //images: any[] = [];

  constructor(private mainService: MainService, private config: NgbCarouselConfig,
    private fb: FormBuilder) { 
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    this.companySub = this.mainService.companySubj.subscribe({
      next: data => {
        this.company = data;
      }
    })

    this.servicesSub = this.mainService.getServices().subscribe({
      next: (data: Service[])=>{
        this.services = data;
      },
      error: err=>{console.log(err)}
    });

    this.testimonialsSub = this.mainService.getTestimo().subscribe(
      {
        next: (data: Testimonial[])=>{
          this.testimonials = data;
        },
        error: err=>{console.log(err)}
      }
    );

    this.portofolioSub = this.mainService.getPortofolio().subscribe({
      next: (data: Portofolio[])=>{
          this.portofolio = data;
          /* for (let porto of this.portofolio) {
            for (let img of porto.works){
              this.images.push(`${environment.api_url}/download-portofo/${img.travail_image}`)
            }
          }
          console.log('images', this.images) */
      },
      error: (err)=>{console.log(err)}
    });

    this.inititContactForm();
    /* swiper();
    portfolioLightbox();
    portfolioIsotopFilter(); */
  }

  inititContactForm(): void {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      objet: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendContactMessage() {
    this.desableContactForm();
    let contact = this.contactForm.value;
    //if(this.contactForm.valid && this.contactForm.dirty){   
      this.mainService.sendContactMail(contact).subscribe({
        next: (data: any) => {
          console.log(data);
          if(data.code == 200) {
            this.successMessage = data.message;
            this.contactForm.reset();
            this.enableContactForm();
            setTimeout(()=>{
              this.successMessage = null;        
            },3000)
          }
          if(data.code == 400) {
            this.enableContactForm(); 
            this.errorMessage = data.message;
            setTimeout(()=>{
              this.errorMessage = null;       
            },5000)
          }
        },
        error: err=>{
          this.enableContactForm(); 
          console.log(err);
        }
      });

    //}
  }

  // Desable Form
  desableContactForm(): void {
    this.contactForm.disable();
    this.desableContactBtn = true;
  }

  // Enable Form
  enableContactForm(): void {
    this.contactForm.enable();
    this.desableContactBtn = false;
  }
  ngOnDestroy(): void {
   /*  this.companySub.unsubscribe();
    this.servicesSub.unsubscribe();
    this.testimonialsSub.unsubscribe(); */
  }

}
