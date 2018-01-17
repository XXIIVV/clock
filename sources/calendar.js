function Calendar()
{
  this.months_in_year = 26;
  this.days_in_month = 14;
  this.date = new Date(); 

  var start = new Date(this.date.getFullYear(), 0, 0);
  var diff = (this.date - start) + ((start.getTimezoneOffset() - this.date.getTimezoneOffset()) * 60 * 1000);

  this.doty = Math.floor(diff/86400000); // day of the year
  this.month = Math.floor(this.doty / this.months_in_year);
  this.day = this.doty % this.days_in_month;

  this.toString = function()
  {
    var d = this.day;
    var m = String.fromCharCode(98 + this.month).toUpperCase();
    var y = this.date.getFullYear().toString().substr(2,2);
    return `${y}${m}${d}`;
  }

  this.menu = function()
  {
    return {label: this.toString(), enabled: false};
  }
}

module.exports = new Calendar()