var msTotalNow = Date.now();
var msInMonth = 2.62974e9;
var msInDay = 86400000;

var msTotalMonthAgo = msTotalNow - msInMonth; 
console.log("msMonthAgo is " + msTotalMonthAgo)

var dateMonthAgo = new Date(msTotalMonthAgo);
console.log(dateMonthAgo); // gives a string Wed Jan 15 2014 12:50:59 GMT-0800 (PST) 
dateMonthAgo.valueOf() // gets the milliseconds primitive value of the dateMongoAgo object: 1389819059882


