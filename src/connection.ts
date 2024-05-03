import mongoose from 'mongoose';

const MONGO_DB_URL = 'mongodb://mongodb:27017/CarShop';
// const MONGO_DB_URL = 'mongodb://localhost:27017/CarShop';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log('Error connecting to MongoDB', error);
});

export default connectToDatabase;
