export interface ICartProduct {
  _id: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  images: string;
  price: number;
  quantity: number;
  size?: ISize;
  slug: string;
  title: string;
}

type ISize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
