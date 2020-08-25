const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/friendslist');

const Friend = conn.define('friend', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    allowNull: false
  }
})

const syncAndSeed = async() => {
  await conn.sync({force: true});
  const [Lucy, Larry, Moe] = await Promise.all([
    Friend.create({name: 'Lucy'}),
    Friend.create({name: 'Larry', rating: 1}),
    Friend.create({name: 'Moe', rating: 10})
  ])
};

module.exports = {
  syncAndSeed,
  models: {
    Friend
  }
}