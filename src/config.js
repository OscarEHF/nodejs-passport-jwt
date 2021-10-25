import { config } from 'dotenv';config();

const env = process.env;

export default {
  PORT: env.PORT || 3000,
  MONGODB_HOST: env.MONGODB_HOST || 'localhost',
  MONGODB_DATABASE_NAME: env.MONGODB_DATABASE_NAME || 'test-db',
  JWT_SECRET_KEY: env.JWT_SECRET_KEY
}
