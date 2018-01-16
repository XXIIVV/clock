function Reminder()
{
  this.scheduled = {};

  this.add = function(name,rate)
  {
    this.scheduled[name] = rate;
  }

  this.any = function()
  {
    for(id in this.reminders){
      var rate = this.reminders[id];
      if(clock.content().beat % rate == 0){
        return id;
      }
    }
    return false;
  }
}

module.exports = new Reminder();