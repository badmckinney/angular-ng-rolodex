const bookshelf = require('./bookshelf');
const User = require('./User');

class Contact extends bookshelf.Model {
  get tableName() { return 'contacts'; }
  get hasTimestamps() { return true; }
  user() { return this.hasOne('User', 'id', 'created_by'); }
}

module.exports = bookshelf.model('Contact', Contact);