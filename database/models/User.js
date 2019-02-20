const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get hasTimestamps() { return true; }
  contacts() {
    return this.hasOne('Contact');
  }
}

module.exports = bookshelf.Model('User', User);