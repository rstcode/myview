import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { rotateAnimation, } from './animations/rotateAnimation';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    rotateAnimation(),
    rotateAnimation({ anchor: 'rotate90', degrees: 90 })
  ]
})
export class AppComponent implements OnInit {

  title = 'myView';
  isFullScreen: boolean = false;
  isSuperMode: boolean = false;
  elem: any;
  rstMode: boolean = false;
  animation = 'rubberBand';
  animationState = false;
  animationWithState = false;
  interval$: Subscription | undefined;
  intervalVal: number = 0;

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.animate();
    //this.
    this.interval$ = interval(1000)
      .subscribe(res => {
        this.intervalVal = res;
        this.animate();
      }
      );
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: any) {
    console.log('orientationChanged');

    this.ngGOnInit();
  }

  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }



  toggleFullScreen() {
    if (!this.isFullScreen) {
      this.openFullscreen();
    }
    else {
      this.closeFullscreen();
    }
    this.isSuperMode = !this.isSuperMode;
    this.isFullScreen = !this.isFullScreen;
    this.ngGOnInit();
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  ngGOnInit(): void {

    switch (screen.orientation.type) {
      case "landscape-primary":
        //horizental mode        
        console.log("That looks good.");
        this.rstMode = true;
        this.animate();
        break;
      case "landscape-secondary":
        console.log("Mmmh… the screen is upside down!");
        break;
      case "portrait-secondary":
      case "portrait-primary":
        //vertical mode
        console.log("Mmmh… you should rotate your device to landscape");
        this.rstMode = false;
        this.animationState = false;
        break;
      default:
        console.log("The orientation API isn't supported in this browser :(");
    }
  }

}

