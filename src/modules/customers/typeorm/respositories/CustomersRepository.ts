import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async finById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async finByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomersRepository;
