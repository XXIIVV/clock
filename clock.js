function Clock()
{
  this.radius = 90;
  this.circ = this.radius * 2 * Math.PI;
  this.center = 105;
  this.reminders = {};

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

  this.time_left = function(target)
  {
    var offset_sec = target - new Date();
    var minutes = offset_sec/60000;
    var beats = (minutes * (1/86.4))*100;
    return (beats);
  }

  this.content = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    return {beat:t_s.substr(0,3),pulse:t_s.substr(3,3)};
  }

  this.add_reminder = function(name,rate)
  {
    this.reminders[name] = rate;
  }

  this.has_reminder = function()
  {
    for(id in this.reminders){
      var rate = this.reminders[id];
      if(this.content().beat % rate == 0){
        return id;
      }
    }
    return false;
  }
}

module.exports = new Clock();