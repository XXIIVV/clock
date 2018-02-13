let clock     = require('./sources/clock')
let calendar  = require('./sources/calendar')

let date      = new Date();

console.log(`${calendar.toString()} ${clock.toString()} = ${date}`)