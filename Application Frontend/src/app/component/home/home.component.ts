import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  logo:string="../../../assets/Images/logo2.jpg";
  images = [
     '../../../assets/Images/pic1.jpg',
     '../../../assets/Images/slider.webp',
     '../../../assets/Images/slider1.jpeg'
 ];
 
   constructor(
     config: NgbCarouselConfig,
     private route: Router
   ) {
     config.interval = 2000;
     config.keyboard = false;
     config.pauseOnHover = false;
   }
 
   ngOnInit(): void {
   }
 
   gotoLogin(): void {
     this.route.navigate(['/customer-login'])
   }
 
 }

