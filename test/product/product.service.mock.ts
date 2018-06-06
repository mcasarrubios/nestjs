import { Product } from '../../src/product';
import { tesProducts } from './product.data.mock';

export const productServiceMock = { 
    findAll: () => tesProducts.map(prod => Object.assign(new Product(), prod))
};