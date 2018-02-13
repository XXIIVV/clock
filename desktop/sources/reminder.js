function Reminder()
{
  this.scheduled = {};

  this.add = function(name,rate)
  {
    this.scheduled[name] = rate;
  }

  this.any = function(beat)
  {
    for(id in this.scheduled){
      var rate = this.scheduled[id];
      if(beat % rate == 0){
        return id;
      }
    }
    return false;
  }
}

module.exports = new Reminder();