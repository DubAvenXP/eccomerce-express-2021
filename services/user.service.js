const faker = require("faker");
const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");

class UserService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.random.arrayElement(["admin", "user"]),
      });
    }
  }

  async create(payload) {
    const user = await models.User.create(payload);
    return user;
  }
  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    if (user.isBlock) {
      throw boom.conflict('User is blocked');
    }
    return user;
  }

  async update(id, payload) {
    const user = await this.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    user.update(payload);
    return user;
  }

  async delete(id) {
    const user = await this.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    user.destroy();
    return user;
  }
}

module.exports = UserService;
