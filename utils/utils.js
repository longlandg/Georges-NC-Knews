exports.createTimeStamp = ((testArticle) => {
  const timeStampArticle = testArticle.map(article => ({
    title: article.title,
    body: article.body,
    votes: article.votes || 0,
    topic: article.topic,
    author: article.author,
    created_at: new Date(article.created_at),
  }));
  return timeStampArticle;
});


exports.createRef = (articleRows, title, article_id) => articleRows.reduce((acc, element) => {
  acc[element[title]] = element[article_id];
  return acc;
}, {});


// .then(ownerRows => {
//     const ownerRef = createRef(ownerRows, 'forename', 'owner_id');
//     const shops = shopData.map(shop => {
//         const {shop_name, slogan} = shop;
//         const newShop = {
//             shop_name,
//             owner_id: ownerRef[shop.owner],
//             slogan
//         }
//         return newShop;

// console.log(new Date(1500584273256))


// // var date1 = new Date('December 17, 1995 03:24:00');
// // // Sun Dec 17 1995 03:24:00 GMT...

// let date2 = new Date(1500584273256);
// if (JS_ObjectIsDate(date2))
// {console.log('its a date object')}
// // // Sun Dec 17 1995 03:24:00 GMT...

// console.log(date1 === date2);
// // expected output: false;

// console.log(date1 - date2);
// // expected output: 0
// let value = 1500584273256;

// let sensibleTime = new Date(value);
// let sting = String(sensibleTime)
// let newTime = new Date('July 20 , 2017 20:57:53.256Z')
// let dd = String(newTime)
// console.log(sting);
// console.log(dd);
// 1500584273256


// console.log(sting === dd)
// 2017-07-20T20:57:53.256Z
// July 20 , 2017 20:57:53.256Z


// December 17, 1995 03:24:00
