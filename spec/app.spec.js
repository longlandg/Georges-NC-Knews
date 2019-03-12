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
      it('GET status : 200 and returns an array of objects', () => {
          return request.get('/api/topics')
          .expect(200)
          
        //         .then(res => {
        //             console.log(res.body)
        //             expect(res.body).to.equal('hello you made it to the api router');

        //         })
        //     });
        //       }
        //       )
        //   })
      
    });
  });
});
})
