function Clock()
{
  this.pomodoro = require("./pomodoro");
  this.reminder = require("./reminder");

  this.time = function()
  {
    var d = new Date(), e = new Date(d);
    var msSinceMidnight = e - d.setHours(0,0,0,0);
    var val = (msSinceMidnight/864) * 10;
    return parseInt(val);
  }

  this.format = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    return t_s.substr(0,3)+":"+t_s.substr(3,3);
  }

  this.calendar = function()
  {
    var now = new Date();
    var year = now.getFullYear();
    var start = new Date(year, 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);

    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    var total_days = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
    var progress = (day/total_days)*100000;
    var date = pad(parseInt(progress),6)

    return {month:date.substr(0,3),day:date.substr(3,3)};
  }

  this.content = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    return {beat:t_s.substr(0,3),pulse:t_s.substr(3,3)};
  }

  function pad(n, width, z = "0")
  {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}

module.exports = new Clock();