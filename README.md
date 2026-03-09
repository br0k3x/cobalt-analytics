# cobalt analytics
a backend analytics service for tracking events and stuff from cobalt instances

### installation

```bash
npm install
```

### running

```bash
npm run dev   # Development with hot reload
npm start     # Production
```

## usage

### 1. register your cobalt instance

```bash
curl -X POST http://cobalt-analytics-api:3010/api/instances/register \
  -H "Content-Type: application/json" \
  -d '{"name": "a cobalt instance"}'
```  
(or use the frontend)

response:
```json
{
  "success": true,
  "instance": {
    "id": "16 characters",
    "name": "My Cobalt Instance"
  },
  "trackingUrl": "http://cobalt-analytics-api:3000/api/events/a1b2c3d4e5f6g7h8/track"
}
```

### 2. configure cobalt
if your fork does not have the option to use these analytics, follow these instructions:  
1. clone this repository, and go to the "cobalt-files" folder
2. add everything from that folder on to your api folder (might have some conflicts)
3. restart your instance and...
4. set the `ANALYTICS_URL` in your cobalt api `.env` or `docker-compose.yml`:

```
ANALYTICS_URL=http://cobalt-analytics-api:3000/api/events/16 characters/track
```  
use the frontend to view your analytics!

