const db = require('./db');
const { User, Tag } = require('./db/models');
const { green, red } = require('chalk');

// var Promise = require('bluebird');

const seed = async () => {
  await db.sync({ force: true });

  // seed your database here!
  const userOne = await User.create({
    username: 'wei',
    password: '1234'
  });

  const userTwo = await User.create({
    username: 'lydie',
    password: '1234'
  });

  const userThree = await User.create({
    username: 'talia',
    password: '1234'
  });

  const tagOne = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.7049444,
    long: -74.0091771,
    assetUrl: 'https://i.imgur.com/qUS6CBj.jpg',
    arTagUrl: 'https://i.imgur.com/p99IbXG.png',
    userId: 3
  });

  const tagTwo = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.716006,
    long: -73.845722,
    assetUrl: 'https://i.imgur.com/IiDUaeJ.png',
    arTagUrl: 'https://i.imgur.com/IiDUaeJ.png',
    userId: 1
  });

  const tagThree = await Tag.create({
    imageUrl: '75 Wall St',
    lat: 40.7049444,
    long: -74.0091773,
    assetUrl: 'https://i.imgur.com/7QqWk03.png',
    arTagUrl: 'https://i.imgur.com/7QqWk03.png',
    userId: 2
  });

  const tagFour = await Tag.create({
    imageUrl: 'Lawrence, NJ',
    lat: 40.629501,
    long: -73.985001,
    assetUrl: 'https://i.imgur.com/qUS6CBj.jpg',
    arTagUrl: 'https://i.imgur.com/p99IbXG.png',
    userId: 2
  });

  const tagFive = await Tag.create({
    imageUrl: 'Lawrence, NJ',
    lat: 40.753849,
    long: -73.978435,
    assetUrl: 'https://i.imgur.com/IiDUaeJ.png',
    arTagUrl: 'https://i.imgur.com/IiDUaeJ.png',
    userId: 2
  });

  const tagSix = await Tag.create({
    imageUrl: 'Lawrence, NJ',
    lat: 40.779756,
    long: -73.955071,
    assetUrl: 'https://i.imgur.com/7QqWk03.png',
    arTagUrl: 'https://i.imgur.com/7QqWk03.png',
    userId: 2
  });

  console.log(green('Seeding success!'));
  db.close();
};

// const syncDb = () => db.sync({ force: true });
//syncDb();
seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});
