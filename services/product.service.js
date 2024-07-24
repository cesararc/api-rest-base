const { faker, da } = require('@faker-js/faker');
const  boom  = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');



class ProductService {

  constructor(){
    this.products = [];
    //this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

    generate(){

    }



    // de esta otra manera validamos que solo entren los datos requerido sin modificar los datos de entrada

    async create(data) {
      const newProduct = await models.Product.create(data);
      return newProduct;
    }

    async find(query) {
      const options = {
        include: ['category'],
      };

      const { limit, offset, max_price, min_price } = query;

      const maxPrice = max_price;
      const minPrice = min_price;

      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }

      if ( maxPrice || minPrice) {
        if (maxPrice && minPrice && maxPrice < minPrice) {
          throw boom.badRequest('maxprice must be greater than minprice');
        }

        options.where = {
          price: {
            [Op.gte]: minPrice || 0,
            [Op.lte]: maxPrice || 1000000,
          },
        };
      }

      const products = await models.Product.findAll(options);
      return products;
    }

    async findOne(id) {
      const product = await models.Product.findByPk(id);

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
