// cobalt/api/src/core
import axios from 'axios';

const ANALYTICS_URL = process.env.ANALYTICS_URL || 'http://cobalt-analytics-api:3000';
const INSTANCE_ID = process.env.ANALYTICS_INSTANCE_ID || '';

export async function trackServiceUsage(serviceName) {
  try {
    await axios.post(`${ANALYTICS_URL}/api/events/${INSTANCE_ID}/track`, {
      type: 'service_usage',
      name: serviceName,
      timestamp: new Date().toISOString()
    });
  } catch (err) {}
}
