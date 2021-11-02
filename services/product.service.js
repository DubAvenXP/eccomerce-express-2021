const faker = require("faker");
const boom = require("@hapi/boom");
const dbConnection = require("../libs/sequelize");

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();

  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(item) {
    const product = {
      id: faker.datatype.uuid(),
      ...item
    };
    this.products.push(product);
    return product;
  }
  async find() {
    const product = await dbConnection.query(`SELECT * FROM products`);
    console.log(product);
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, payload) {
    const product = this.findOne(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    Object.assign(product, payload);
    return product;
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
