require('dotenv').config();
const app = require('./app');
const sequelize = require('./db');

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  console.log('MySQL connection established');
  app.listen(PORT, () => {
    console.log(`cobalt analytics - running on port ${PORT}`);
    console.log(`environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch(err => {
  console.error('error:', err);
  process.exit(1);
});
