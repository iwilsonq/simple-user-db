const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'Yeah it is.'});

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blog posts on delete', done => {
    joe.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });

});
