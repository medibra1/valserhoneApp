import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalDismissReasons, NgbCarousel, NgbModal, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Devis, Service, Slider } from 'src/app/models/slider';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

declare function globalJs(): any ;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  //providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class HeroComponent implements OnInit, OnDestroy {

  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/1930/800`);
  //images = [1,2].map((n) => `assets/img/hero-carousel/${n}.jpg`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = false;

  public sliders!: Slider[];
  public slidersSub!: Subscription;
  public Downloadimage = `${environment.api_url}/download-file`;
  public services!: Service[];
  public devisForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: any = null;
  errorMessage2 = '';

  public desableButton = false;

  /* public currentYear = new Date().getFullYear();
  public currentMonth = new Date().getMonth()+1;
  public currentDate = new Date().getDate(); */
  
  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;
  closeResult!: string;
  constructor(private mainService: MainService, private modalService: NgbModal, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.slidersSub = this.mainService.getSliders().subscribe({
      next: (data: Slider[]) => {
        this.sliders = data;
      },
      error: (err: any)=> {console.log(err)}
    });

    globalJs();

    this.mainService.getServices().subscribe({
      next: (data: Service[])=> {
        this.services = data;
      },
      error: err=> {console.log(err)}
    });

    this.inititDevisForm();
  }

  inititDevisForm(): void {
    this.devisForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      adresse: [''],
      telephone: [''],

      dim_interieur: [''],
      dim_exterieur: [''],
      dim_plafond: [''],
      dim_sol_interieur: [''],
      dim_sol_exterieur: [''],

      service_interieur: [''],
      service_exterieur: [''],
      service_plafond: [''],
      service_sol_interieur: [''],
      service_sol_exterieur: [''],

      divers_libelle: [''],
      divers_dim: [''],

      description: [''],
      date: [''],
      heure1: [''],
      heure2: [''],
    });
  }

  sendDevis() {
    this.desableForm();
    let devis = this.devisForm.value;
    //if(this.contactForm.valid && this.contactForm.dirty){   
      this.mainService.sendDevisMail(devis).subscribe({
        next: (data: any) => {  
          console.log(data);
          if(data.code == 200) {  // la requette est ok
            this.successMessage = data.message;
            this.devisForm.reset();
            this.enableForm();
            setTimeout(()=>{ // on afiche successMessage durant 2s, on reinitialise successMessage et fermons le modal
              this.successMessage = null;  
              this.close();      
            },2000)
          }
          if(data.code == 400) { // il y a un problemes de validateurs
            this.enableForm();
            this.errorMessage = data.message;
            setTimeout(()=>{
              this.errorMessage = null;        
            },5000)
          }
        },
        error: err=>{
          this.enableForm();
          this.errorMessage2 = 'oups !!! Une erreur est servenue. Veuillez reeéssayer.';  
          setTimeout(()=>{
            this.errorMessage2 = '';        
          },3000);
          console.log(err);   
        }
      });

    //}
  }

  // Desable Form
  desableForm(): void {
    this.devisForm.disable();
    this.desableButton = true;
  }

  // Enable Form
  enableForm(): void {
    this.devisForm.enable();
    this.desableButton = false;
  }

  // Open Modal
  open(content: any) {
    this.modalService.open(content);
  }

  // Close modal 
  close(): void {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.slidersSub.unsubscribe();
  }



  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
