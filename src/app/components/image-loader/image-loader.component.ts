import { Component, Input, OnInit } from '@angular/core';
import { SenderService } from '../../service/sender.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit {
  @Input() image_array!: any[];
  images!: any[];
  currentIndex: number = 0;
  fieldValue: any;

  constructor(private sharedService: SenderService) { }

  ngOnInit(): void {
    
    console.log('temp ref', this.image_array)
    this.sharedService.fieldValue$.subscribe(value => {
      console.log('ref',this.image_array)
      console.log(this.fieldValue)
      this.fieldValue = value;
      
        for(let i=0; i< this.image_array.length; i++){
          let img = this.image_array[i].id
          if(img == this.fieldValue){
            
            this.images = this.image_array[i].images;
           
          }
          
        }
        
    });

    // Ensure that image_array is defined and contains elements before accessing it
  
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    if (this.image_array && this.image_array.length > this.currentIndex) {
      this.images = this.image_array[this.currentIndex];
    }
  }
}
