/**
 * In-memory events store
 * For production, replace with a database (MongoDB, PostgreSQL, etc.)
 */

class EventsStore {
  constructor() {
    this.events = [];
  }

  add(event) {
    this.events.push(event);
    return event;
  }

  getAll(limit = 100, offset = 0, instanceId = null) {
    let filtered = this.events;
    
    if (instanceId) {
      filtered = filtered.filter(event => event.instanceId === instanceId);
    }
    
    const total = filtered.length;
    const events = filtered
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(offset, offset + limit);

    return { events, total };
  }

  getByType(type, limit = 100, instanceId = null) {
    let filtered = this.events.filter(event => event.type === type);
    
    if (instanceId) {
      filtered = filtered.filter(event => event.instanceId === instanceId);
    }
    
    return filtered
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  getById(id) {
    return this.events.find(event => event.id === id);
  }

  getByInstance(instanceId, limit = 100) {
    return this.events
      .filter(event => event.instanceId === instanceId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  clear() {
    this.events = [];
  }

  clearInstance(instanceId) {
    this.events = this.events.filter(event => event.instanceId !== instanceId);
  }
}

module.exports = new EventsStore();
