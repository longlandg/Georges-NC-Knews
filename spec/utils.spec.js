
const { createTimeStamp } = require('../utils/utils.js');
const { expect } = require('chai');

describe('createTimeStamp', () => {
  it('returns an array of 1 obj where the date stamp has been changed', () => {
    const testArticle = [{
      title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
      topic: 'coding',
      author: 'jessjelly',
      body:
         'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
      votes: 0,
      created_at: 1500584273256,
    }];
    const actual = createTimeStamp(testArticle);
    const expected = [{
      title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
      topic: 'coding',
      author: 'jessjelly',
      body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
      votes: 0,
      created_at: new Date('2017-07-20T20:57:53.256Z'),
    }];

    expect(actual).to.eql(expected);
  });
});
