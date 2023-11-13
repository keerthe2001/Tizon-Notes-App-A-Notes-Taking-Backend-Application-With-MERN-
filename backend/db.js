const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1/hello';

async function ConnectToMongoose() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
ConnectToMongoose();
module.exports = ConnectToMongoose