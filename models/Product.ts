import { IProduct } from '@/interfaces';
import mongoose, { Schema, Model, model } from 'mongoose';

const productSchemal = new Schema(
  {
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} no es un tamaña permitido',
        },
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} no es un tipo permitido',
      },
      default: 'shirts',
    },
    gender: { 
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} no es un genero permitido',
      },
      default: 'woman',
    },
  },
  { timestamps: true }
);

productSchemal.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> =
  mongoose.models.Product || model('Product', productSchemal);

export default Product;
