process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
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
            expect(body).to.be.a('object');
          });
      });
    });
    xdescribe('/topics', () => {
      it('POST status : 900 and an error object with key of msg', () => {
        const topicToPost = { slug: 'mitch', description: 'The tastiest of all the fruits' };
        return request.post('/api/topics').send(topicToPost)
          .expect(422)
          .then(({ body }) => {
            console.log({ body });
            expect(body).contain.key('code');
            expect(body.code).to.eql('2305');
          });
      });
    });
    describe('/articles', () => {
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
    });
    describe('/articles/:article_id', () => {
      it('GET status : 200 and returns an array of objects', () => request.get('/api/articles/1')
        .expect(200)
        .then((res) => {
          expect(res.body.article[0]).to.be.an('object');
          expect(res.body.article[0].article_id).to.equal(1);
          expect(res.body.article[0]).to.contain.keys('article_id', 'title', 'body', 'created_at', 'topic', 'author', 'votes', 'comment_count');
        }));
      it('GET status : 200 and returns an array of objects', () => request.get('/api/articles/5')
        .expect(200)
        .then((res) => {
          expect(res.body.article[0]).to.be.an('object');
          expect(res.body.article[0].article_id).to.equal(5);
          expect(res.body.article[0]).to.contain.keys('article_id', 'title', 'body', 'created_at', 'topic', 'author', 'votes', 'comment_count');
        }));
      it('PATCH status : 200 and increments vote of article by new vote amount', () => request.patch('/api/articles/1')
        .send({ inc_votes: 1 })
        .expect(202)
        .then((res) => {
          expect(res.body.updatedArticle).to.be.an('object');
          expect(res.body.updatedArticle.votes).to.equal(101);
        }));
      it('DELETE status : 204 and return message of ', () => request.delete('/api/articles/1')

        .expect(204)
        .then((res) => {
          expect(res.body).to.eql({});
        }));
    });
    describe('/articles/:article_id/comments', () => {
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
    describe.only('/comments/:comments_id', () => {
      it('PATCH status : 200 and increments vote of a comment by new vote amount', () => request.patch('/api/comments/5')
        .send({ inc_votes: 1 })
        .expect(202)
        .then((res) => {
          expect(res.body.comment).to.be.an('array');
          expect(res.body.comment[0].votes).to.equal(1);
        }));
    });
  });
});
