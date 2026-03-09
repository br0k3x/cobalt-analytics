const crypto = require('crypto');

class InstancesStore {
  constructor() {
    this.instances = new Map();
  }

  generateId() {
    let id;
    do {
      id = crypto.randomBytes(8).toString('hex');
    } while (this.instances.has(id));
    return id;
  }

  /**
   * Create a new instance
   */
  create(data) {
    const id = this.generateId();
    const instance = {
      id,
      name: data.name || 'unnamed instance',
      description: data.description || '',
      createdAt: new Date().toISOString(),
      lastEventAt: null,
      eventCount: 0
    };
    this.instances.set(id, instance);
    return instance;
  }

  /**
   * Get instance by ID
   */
  getById(id) {
    return this.instances.get(id) || null;
  }

  /**
   * Check if instance exists
   */
  exists(id) {
    return this.instances.has(id);
  }

  /**
   * Update instance stats
   */
  recordEvent(id) {
    const instance = this.instances.get(id);
    if (instance) {
      instance.lastEventAt = new Date().toISOString();
      instance.eventCount++;
    }
  }

  /**
   * Get all instances
   */
  getAll() {
    return Array.from(this.instances.values());
  }

  /**
   * Delete an instance
   */
  delete(id) {
    return this.instances.delete(id);
  }
}

module.exports = new InstancesStore();
