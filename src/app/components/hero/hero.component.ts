import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  //providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class HeroComponent implements OnInit {

  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/1930/800`);
  images = [1,2].map((n) => `assets/img/hero-carousel/${n}.jpg`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;
  constructor() {}

  ngOnInit(): void {

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

   // for extra options like breakpoints use ngAfterContentInit
  /*  ngAfterViewInit(): void {
    this.config = {
      //...
      pagination: {
        clickable: true
      },
      speed: 1000,
      autoplay: {
        delay: 500,
        disableOnInteraction: false
      }
    };
    // Start autoplay
    this.swiperSlideShow.swiperRef.autoplay.start();
  } */

}
