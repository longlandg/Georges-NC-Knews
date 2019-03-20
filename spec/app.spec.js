process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/badroute', () => {
    it('statuscode: 404 with appropriate message', () => request.get('/badroute')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('route not found');
      }));
  });


  describe('/Api', () => {
    it('statuscode: 404 with appropriate message', () => request.get('/Api')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('route not found');
      }));


    describe('/topics', () => {
      it('GET status : 200 and returns an array of objects', () => request.get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).to.equal(2);
          expect(body.topics[0]).contain.keys('slug', 'description');
        }));
    });
    describe('/topics', () => {
      it('POST status : 201 and returns an array with a single object', () => {
        const topicToPost = { slug: 'bananas', description: 'The tastiest of all the fruits' };
        return request.post('/api/topics').send(topicToPost)
          .expect(201)
          .then(({ body }) => {
            expect(body.topic).contain.keys('slug', 'description');
            expect(body.topic).to.eql(topicToPost);
            expect(body).to.be.an('object');
          });
      });
      it('BAD REQUEST statuscode:400, when passed a malformed body', () => {
        const badRequestPost = { description: 'The tastiest of all the fruits' };

        return request.post('/api/topics')

          .send(badRequestPost)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST information required');
          });
      });
      it('BAD REQUEST statuscode:422, when given a malformed body', () => {
        const badRequestPost = { slug: 'mitch', description: 'The tastiest of all the fruits' };
        return request.post('/api/topics')
          .send(badRequestPost)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST duplicate key value violates unique constraint "topics_pkey"');
          });
      });
      it('BAD METHOD statuscode:405', () => request.patch('/api/topics')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('patch / put / delete method not allowed');
        }));
    });

    describe.only('/articles', () => {
      it('BAD QUERY statuscode:400', () => request.get('/api/articles?sort_by=bca')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('BAD REQUEST column does not exist');
        }));
      it('BAD QUERY statuscode:400', () => request.get('/api/articles?order=abddddddddddbc')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('BAD REQUEST column does not exist');
        }));
      it('BAD QUERY statuscode:400 author does not exist', () => request.get('/api/articles?author=gary')
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).to.equal('UNPROCESSED ENTITY input not in table');
        }));

      it('GET status : 200 and returns an array of objects', () => request.get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('GET status : 200 and returns an array of objects filtered by author', () => request.get('/api/articles?author=icellusedkars')
        .expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(6);
          expect(res.body.articles[0]).contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('GET status : 200 and returns an array of objects filtered by topic', () => request.get('/api/articles?topic=cats')
        .expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(1);
          expect(res.body.articles[0]).contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        }));
      it('GET status : 200 and returns an array of objects sorted by date by default in desc order', () => request.get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].article_id).to.equal(1);
        }));
      it('GET status : 200 and returns an array of objects sorted by a valid column by default in desc order', () => request.get('/api/articles?sort_by=article_id')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].article_id).to.equal(12);
        }));
      it('GET status : 200 and returns an array of objects sorted by a valid column by having changed to asc through a query', () => request.get('/api/articles?sort_by=article_id&&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].article_id).to.equal(1);
        }));
      it('POST status : 201 and returns an array with a single article object', () => {
        const articleToPost = {
          title: 'cats and their hats', body: 'something something hatty catty', topic: 'cats', username: 'rogersop',
        };
        return request.post('/api/articles')
          .send(articleToPost)
          .expect(201)
          .then((res) => {
            expect(res.body.article).to.be.an('object');
            expect(res.body.article).to.contain.keys('article_id', 'title', 'body', 'created_at', 'topic', 'author', 'votes');
          });
      });
      it('BAD METHOD statuscode:405', () => request.patch('/api/articles')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('patch / put / delete method not allowed');
        }));
      it('BAD REQUEST statuscode:400, when when missing a required key', () => {
        const badArticleToPost = {
          body: 'something something hatty catty', topic: 'cats', username: 'rogersop',
        };
        return request.post('/api/articles')
          .send(badArticleToPost)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST information required');
          });
      });
      it('BAD REQUEST statuscode:400, when when posting article where topic or username doesnt exist', () => {
        const badArticleToPost = {
          body: 'something something hatty catty', topic: 'cats',
        };
        return request.post('/api/articles')
          .send(badArticleToPost)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST information required');
          });
      });
    });
    describe('/articles/:article_id', () => {
      it('BAD REQUEST statuscode:400, when passed a bad query', () => request.get('/api/articles/dog')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('BAD REQUEST invalid input');
        }));
      it('UNPROCESSED ENTITY statuscode:422', () => {
        request.get('/api/articles/999999')
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal('UNPROCESSED ENTITY input not in table');
          });
      });
      it('BAD REQUEST statuscode:400, when trying to patch with no body', () => {
        request.patch('/api/articles/5')
          .send({})
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST invalid input');
          });
      });
      it('BAD REQUEST statuscode:400, when trying to patch withadditional keys', () => {
        request.patch('/api/articles/5')
          .send({ inc_votes: 'cat', name: 'Mitch' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST too many keys');
          });
      });
      it('unprocessable entity statuscode:422, when trying to delete where article id does not exist', () => {
        request.delete('/api/articles/500')

          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal('UNPROCESSED ENTITY input not in table');
          });
      });
      it('BAD REQUEST statuscode:400, when trying to delete where article id is not a number', () => {
        request.delete('/api/articles/gary')

          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST invalid input');
          });
      });


      it('GET status : 200 and returns an array of 1objects', () => request.get('/api/articles/1')
        .expect(200)
        .then((res) => {
          expect(res.body.article).to.be.an('object');
          expect(res.body.article.article_id).to.equal(1);
          expect(res.body.article).to.contain.keys('article_id', 'title', 'body', 'created_at', 'topic', 'author', 'votes', 'comment_count');
        }));
      it('GET status : 200 and returns an array of 2objects', () => request.get('/api/articles/5')
        .expect(200)
        .then((res) => {
          expect(res.body.article).to.be.an('object');
          expect(res.body.article.article_id).to.equal(5);
          expect(res.body.article).to.contain.keys('article_id', 'title', 'body', 'created_at', 'topic', 'author', 'votes', 'comment_count');
        }));
      it('PATCH status : 200 and increments vote of article by new vote amount', () => request.patch('/api/articles/1')
        .send({ inc_votes: 1 })
        .expect(202)
        .then((res) => {
          expect(res.body.updatedArticle).to.be.an('object');
          expect(res.body.updatedArticle.votes).to.equal(101);
        }));
      it('DELETE status : 204 and delete article', () => request.delete('/api/articles/1')

        .expect(204)
        .then((res) => {
          expect(res.body).to.eql({});
        }));
    });
    describe('/articles/:article_id/comments', () => {
      it('GET status : 400 and returns an array of comments for a given ID', () => request.get('/api/articles/gary/comments')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('BAD REQUEST invalid input');
        }));

      it('POST status : 422 and returns an error message', () => {
        const commentToPost = { username: 'icellusedkars', body: 'words cant explain how brilliant this article' };
        request.post('/api/articles/500/comments').send(commentToPost)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal('UNPROCESSED ENTITY input not in table');
          });
      });


      it('GET status : 200 and returns an array of comments for a given ID', () => request.get('/api/articles/6/comments')
        .expect(200)
        .then((res) => {
          expect(res.body.comments).to.be.an('array');
          expect(res.body.comments.length).to.equal(1);
        }));
      it('GET status : 200 and returns an array of comments for a given ID', () => request.get('/api/articles/5/comments?sort_by=comments_id&&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.comments[0]).to.be.an('object');
          expect(res.body.comments[0].comments_id).to.equal(14);
        }));
      it('POST status : 200 and a comment object with key of comment', () => {
        const commentToPost = { username: 'icellusedkars', body: 'words cant explain how brilliant this article' };
        request.post('/api/articles/5/comments').send(commentToPost)
          .expect(201)
          .then((res) => {
            expect(res.body.comment).to.be.an('object');
            expect(res.body.comment).to.contain.keys('comments_id', 'article_id', 'votes', 'created_at', 'author', 'body');
            expect(res.body.comment.article_id).to.equal(5);
            expect(Object.keys(res.body)[0]).to.equal('comment');
          });
      });
    });
    describe('/comments/:comments_id', () => {
      it('BADPATCH status : 400 when given no key', () => {
        const commentToPost = { };
        request.patch('/api/articles/5')
          .send({ commentToPost })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST invalid input');
          });
      });


      it('BAD REQUEST statuscode:400, when trying to delete where article id does not exist', () => {
        request.delete('/api/comments/500')

          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST column does not exist');
          });
      });
      it('BAD REQUEST statuscode:400, when trying to delete where article id is not a number', () => {
        request.delete('/api/comments/gary')

          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST invalid input');
          });
      });


      it('PATCH status : 200 and increments vote of a comment by new vote amount', () => request.patch('/api/comments/5')
        .send({ inc_votes: 1 })
        .expect(202)
        .then((res) => {
          expect(res.body.comment).to.be.an('object');
          expect(res.body.comment.votes).to.equal(1);
          expect(res.body.comment).to.contain.keys('comments_id', 'article_id', 'votes', 'created_at', 'author', 'body');
        }));
      it('DELETE status : 204 and and delete article', () => request.delete('/api/comments/5')
        .expect(204)
        .then((res) => {
          expect(res.body).to.eql({});
        }));
    });
    describe('/users', () => {
      it('GET status : 200 and returns an array of user objects', () => request.get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).to.equal(3);
          expect(body.users[0]).contain.keys('username', 'avatar_url', 'name');
        }));
      it('POST status : 201 and returns an array with a single user object', () => {
        const userToPost = { username: 'george2000', avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=6', name: 'george' };
        request.post('/api/users')
          .send(userToPost)
          .expect(201)
          .then(({ body }) => {
            expect(body.user).to.eql(userToPost);
            expect(body.user).contain.keys('username', 'avatar_url', 'name');
          });
      });
      it('POST status : 400 and an error message', () => {
        const userToPost = { username: 'icellusedkars', avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=6' };
        request.post('/api/users')
          .send(userToPost)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST information required');
          });
      });
      it('POST status : 422 and an error message', () => {
        const userToPost = { username: 'icellusedkars', avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=6', name: 'sam' };
        return request.post('/api/users')
          .send(userToPost)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal('BAD REQUEST duplicate key value violates unique constraint "topics_pkey"');
          });
      });


      it('BAD METHOD statuscode:405', () => request.patch('/api/users')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('patch / put / delete method not allowed');
        }));
    });
    describe('/users/:username', () => {
      it('GET status : 200 returns an user object', () => request.get('/api/users/icellusedkars')
        .expect(200)
        .then(({ body }) => {
          expect(body.user).contain.keys('username', 'avatar_url', 'name');
        }));
      it('GET status : 422 returns a UNPROCESSED ENTITY error essage', () => request.get('/api/users/kars')
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).to.equal('UNPROCESSED ENTITY input not in table');
        }));
    });
  });
});
