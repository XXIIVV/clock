var clock = require("./clock.js");
var cal = clock.calendar();
console.log(clock.time())
console.log(`month:${cal.month} week:${cal.week} day:${cal.day}`)