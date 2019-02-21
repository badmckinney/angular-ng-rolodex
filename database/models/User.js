const bookshelf = require('./bookshelf');
const Contact = require('./Contact');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get hasTimestamps() { return true; }
  contacts() {
    return this.hasMany('Contact', 'contacts');
  }
}

module.exports = bookshelf.model('User', User);