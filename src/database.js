import mongoose from 'mongoose';

import config from "./config.js";

const {
  MONGODB_HOST,
  MONGODB_DATABASE_NAME
} = config;

const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE_NAME}`;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(`Mongo is connected to ${MONGODB_URI}`))
  .catch((error) => console.log(error.stack));
