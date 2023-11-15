// {id: 1, image: '../../../assets/images/Снимок экрана 2023-06-05 164853.jpg', pictureName: 'Лежащая',year: 2023,tool:"Масло, холст",size:"60х80",price:180},

export interface Product {
  id: number;
  list_image: string;
  name: string;
  prod_year: number;
  techlogy: string;
  paint_size: string;
  price: number;
  page: number;
}

export interface ProdcutsWrapper {
  total: number;
  productList: Product[];
}

export interface ProductDetails {
  id: number;
}
