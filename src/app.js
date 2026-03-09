const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const packageInfo = require('../package.json');

const analyticsRoutes = require('./routes/analytics.routes');
const eventsRoutes = require('./routes/events.routes');
const instancesRoutes = require('./routes/instances.routes');
const healthRoutes = require('./routes/health.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/analytics', analyticsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/instances', instancesRoutes);
app.use('/health', healthRoutes);

app.get('/', (req, res) => {
  res.json({
    name: packageInfo.name + " api",
    version: packageInfo.version,
    endpoints: {
        'instances': '/api/instances',
        'analytics': '/api/analytics',
        'events': '/api/events',
        'health': '/health'
    }
  });
});

app.use(errorHandler);

module.exports = app;
