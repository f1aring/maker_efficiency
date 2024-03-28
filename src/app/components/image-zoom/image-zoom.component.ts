import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css']
})
export class ImageZoomComponent implements OnInit {
  imageUrl: string = 'https://res.cloudinary.com/dr3buczbc/image/upload/v1710750810/images/image2.png';

  constructor() { }

  ngOnInit(): void {
    this.imageZoom("myimage", "myresult");
  }

  imageZoom(imgID: string, resultID: string) {
    const img: HTMLImageElement | null = document.getElementById(imgID) as HTMLImageElement;
    const result: HTMLElement | null = document.getElementById(resultID);

    if (!img || !result) {
      return;
    }

    const lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement?.insertBefore(lens, img);

    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url('${this.imageUrl}')`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    function moveLens(event: MouseEvent) {
      const x = event.clientX - lens.offsetWidth / 2;
      const y = event.clientY - lens.offsetHeight / 2;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;

      if (result) {
        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
      }
    }

    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
  }
}
