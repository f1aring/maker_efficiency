import { Component } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrl: './image-loader.component.css'
})
export class ImageLoaderComponent {
  index:number = 0;
  img_src1: string[] = ["./assets/jabed","./assets/malek","./assets/mehedi"];
  len1:number = this.img_src1.length;
  img_src2: string[] = ["./assets/malek","./assets/mehedi"];
  len2:number = this.img_src2.length;
  img_src3: string[] = ["./assets/malek"];
  len3:number = this.img_src3.length;
  step = 1;
  onSubmit(){
    this.step++;

  }}