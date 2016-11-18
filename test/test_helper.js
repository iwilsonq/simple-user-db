const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('Warning', error));
});

beforeEach(() => {
  mongoose.connection.collections.users.drop(done => {
    // Ready to run the next test!
    return done;
  });
});
