import { Component } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent {
  images = [
    'https://res.cloudinary.com/dr3buczbc/image/upload/v1710750810/images/image2.png',
    'https://res.cloudinary.com/dr3buczbc/image/upload/v1711721761/images/image1.png'
  ];
  currentIndex: number = 0;

  constructor() { }


  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
