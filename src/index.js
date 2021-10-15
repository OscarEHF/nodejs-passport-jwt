import app from './server.js';
import './database.js';

// Starting the server
app
  .listen(app.get('port'), () => {
    console.log(`Server listening at http://localhost:${app.get('port')}`);
  })
  .on('error', (error) => {
    console.error(error.stack);
  });
