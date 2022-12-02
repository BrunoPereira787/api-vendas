import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository); //recebe todos os metodos dos repository mais os metodos que eu criei

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
