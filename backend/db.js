const mongoose = require('mongoose');
const connectionString = PROCESS.ENV.connectionString;

async function ConnectToMongoose() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    console.log(connectionString);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
ConnectToMongoose();
module.exports = ConnectToMongoose