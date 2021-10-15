import { config } from 'dotenv';config();

const env = process.env;

export default {
  PORT: env.PORT || 3000
}
