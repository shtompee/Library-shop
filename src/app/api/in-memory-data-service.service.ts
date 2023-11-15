import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const products= [

      {id: 1, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 2, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 3, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},  
      {id: 4, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},  
      {id: 5, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 6,  image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 7, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 8,image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 9, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 10, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 1, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 2, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 3, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},  
      {id: 4, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},  
      {id: 5, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 6,  image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 7, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 8,image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 9, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 10, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 2, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 3, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},  
      {id: 4, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},  
      {id: 5, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 6,  image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 7, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 8,image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 9, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
      {id: 10, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg',  pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},
    ];

    return { products }; 

  }

  constructor() {

   }
  
}
