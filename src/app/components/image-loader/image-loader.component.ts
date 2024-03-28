import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements AfterViewInit {

  yourThumbnailImage = 'https://res.cloudinary.com/dr3buczbc/image/upload/v1710750810/images/image2.png';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  moveMouseToCoordinates(x: number, y: number) {
    const mouseEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    });

    this.el.nativeElement.dispatchEvent(mouseEvent);
  }

  ngAfterViewInit() {
    const image = new Image();
    image.onload = () => {
      // Adjust these coordinates based on the position of your image
      const imageX = 500; // X-coordinate of the image
      const imageY = 1000; // Y-coordinate of the image

      // Move mouse to the image coordinates
      this.moveMouseToCoordinates(imageX, imageY);
    };
    image.src = this.yourThumbnailImage;
  }
}
