const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Thought.deleteMany({});

  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    // const assignments = getRandomAssignments(20);

    const username = getRandomName();
    const email = `${username}@gmail.com`;
    // const thoughts = getRandomThoughts();

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);

  const thoughts = [];

  for (let i = 0; i < 20; i++) {
    // const assignments = getRandomAssignments(20);

    const thoughtText = getRandomThoughts(1);
    const username = getRandomName();
    const reactions = getRandomReactions(1);

    thoughts.push({
      thoughtText,
      username,
      reactions,
    });
  }

  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
