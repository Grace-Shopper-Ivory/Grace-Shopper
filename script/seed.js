'use strict';

const {
  db,
  models: { User, Product, Order },
} = require('../server/db');
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  //start
  const users = [
    {
      username: 'Cody',
      password: '123',
      firstName: 'Cody',
      lastName: 'Lester',
      email: 'kcodylester@gmail.com',
      admin: true,
      imageUrl:
        'https://www.tasteofhome.com/wp-content/uploads/2020/05/scored-bread.jpg',
    },
    {
      username: 'Eric',
      password: '123',
      firstName: 'Eric',
      lastName: 'Jiang',
      email: 'eric@gmail.com',
      admin: true,
      imageUrl:
        'https://i.pinimg.com/originals/eb/86/b3/eb86b3a51af7703a44ebb5ee4657b5ed.jpg',
    },
    {
      username: 'Ethan',
      password: '123',
      firstName: 'Ethan',
      lastName: 'Bradley',
      email: 'ethan@gmail.com',
      admin: true,
      imageUrl:
        'https://i1.wp.com/bakethisday.com/wp-content/uploads/2013/02/bread-love-1.jpg?fit=450%2C450&ssl=1',
    },
    {
      username: 'Mason',
      password: '123',
      firstName: 'Mason',
      lastName: 'Swager',
      email: 'Mason@gmail.com',
      admin: false,
      imageUrl:
        'https://i.pinimg.com/originals/6c/eb/11/6ceb110780c987ecb8fc6c627941418c.jpg',
    },
    {
      username: 'Guest',
      password: '123',
      firstName: 'Guest',
      lastName: 'Guest',
      email: 'Guest@gmail.com',
      admin: false,
    },
  ];

  const products = [
    {
      name: 'testBread01',
      price: 1.11,
      category: 'default',
    },
    {
      name: 'Brioche on Bark',
      img: 'https://preview.redd.it/sccvha8dpct81.jpg?width=640&crop=smart&auto=webp&s=57b0251f3dd40a9619ea7f66c7acd3c35eb386aa',
      description:
        'creator: Jaque Bredphase, Artistic analysis: framing is exquisit, lighting is etherial. Tree structure is bold. A perfect specimen',
      price: 24.99,
      quantity: 10,
      category: 'day',
    },
    {
      name: 'Tortillas on Trunk',
      img: 'https://external-preview.redd.it/DaNAaU_IpqVQvFOB4xrwSfKaa6B1Lpova2pF-ypQc4Q.jpg?width=640&crop=smart&auto=webp&s=944097396bfd2ec247cd89822afede5b41a7bc4f',
      description: 'creator: anonymous, Artistic analysis: A fantastic exercise in shapes. A truly once in a lifetime piece',
      price: 99.99,
      quantity: 50,
      category: 'night',
    },
    {
      name: 'Gradient in a Grove',
      img: 'https://preview.redd.it/6yxaqpesect01.jpg?width=640&crop=smart&auto=webp&s=f4494914ac8136f10d4e11fbec8b8108f1c44788',
      description: 'creator: Logan Mythic, Artistic analysis: A proud piece with much to ponder. A well known artist makes this a great investment.',
      price: 250.00,
      quantity: 10,
      category: 'night',
    },
    {
      name: 'Tree Stapled to Bread...',
      img: 'https://preview.redd.it/2eqtm5we52o11.jpg?width=640&crop=smart&auto=webp&s=6ce7fca5936a05d60e2d26bac2938d0c4e2fc0e9',
      description: 'creator: Ed Keith, Artistic analysis: Something different. A perfect example of out of the box thinking.',
      price: 1299.99,
      quantity: 3,
      category: 'night',
    },
    {
      name: 'Buns on a Branch',
      img: 'https://preview.redd.it/50dok79rm0h31.jpg?width=640&crop=smart&auto=webp&s=85f4450deecf1611e20e33f20dcb68fbd691ad7c',
      description: 'creator: Tommy Ford, Artistic analysis: You dont see this often. The emotion it provokes powerful, yet soothing.',
      price: 679.99,
      quantity: 50,
      category: 'night',
    },
  ];

  // const orders = [
  //   {
  //     userId: 1,
  //     productId: 2,
  //     amount: 4,
  //     priceOfItem: 1799,
  //     inCart: false,
  //   },
  //   {
  //     userId: 3,
  //     productId: 1,
  //     amount: 2,
  //     priceOfItem: 1799,
  //   },
  //   {
  //     userId: 2,
  //     productId: 1,
  //     amount: 1,
  //     priceOfItem: 1799,
  //     inCart: false,
  //   },
  //   {
  //     userId: 3,
  //     productId: 3,
  //     amount: 5,
  //     priceOfItem: 1799,
  //   },
  //   {
  //     userId: 1,
  //     productId: 3,
  //     amount: 6,
  //     priceOfItem: 1799,
  //     inCart: false,
  //   },
  //   {
  //     userId: 3,
  //     productId: 2,
  //     amount: 1,
  //     priceOfItem: 1799,
  //     inCart: false,
  //   },
  // ];

  await Promise.all(
    products.map((product) => {
      return Product.create(product); //changed from (...product)
    }),
    users.map((user) => {
      return User.create(user);
    })
  );
  // await Promise.all(
  //   orders.map((order) => {
  //     return Order.create(order);
  //   })
  // );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
