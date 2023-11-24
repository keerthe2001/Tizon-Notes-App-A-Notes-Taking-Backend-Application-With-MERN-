const mongoose = require('mongoose');
const connectionString = "mongodb+srv://keertheshwaran:EHIYlNqijxFub1FZ@cluster0.4peos7q.mongodb.net/hello"

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