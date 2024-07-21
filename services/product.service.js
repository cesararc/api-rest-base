const { faker, da } = require('@faker-js/faker');
const  boom  = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');


class ProductService {

  constructor(){
    this.products = [];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

    generate(){
      const limit =  100;
      for (let index = 0; index < limit; index++) {
        this.products.push({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.url(),
          isBlock: faker.datatype.boolean(),
        });

      }
    }



    // de esta otra manera validamos que solo entren los datos requerido sin modificar los datos de entrada

    async create(data) {
      const newProduct = await models.Product.create(data);
      return newProduct;
    }

    async find() {
      const products = await models.Product.findAll({
        include: ['category']
      });
      return products;

    };

    async findOne(id) {
      //const name = this.getTotal();
      const product = this.products.find(item => item.id === id);
      if (!product){
        //throw new Error('product not found');
        throw boom.notFound('product not found');
      }
      if (product.isBlock){
        throw boom.conflict('product is block');
      }
      return product;


    };
    async update(id, changes){
       const index = this.products.findIndex(item => item.id ===id);
       if (index === -1){
        //throw new Error('product not found');
        throw boom.notFound('product not found');
       }
       const product = this.products[index];
       this.products[index] = {
       ...product,
       ...changes
       }
       return this.products[index];
    };

    async delete(id){
      const index = this.products.findIndex(item => item.id ===id);
           if (index === -1){
            //throw new Error('product not found');
            throw boom.notFound('delete product not found');
           }
      this.products.splice(index, 1);
      return { id }; // se puede enviar que todo salio bien o el id o el mensaje o el id
    }




}

module.exports =ProductService;
