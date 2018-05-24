function Reminder()
{
  this.scheduled = {};
  this.mute = false;

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

  this.toggle_mute = function()
  {
    this.mute = this.mute ? false : true;
  }

  this.menu = function(app)
  {
    return {label: 'Mute Reminders', type: 'checkbox', checked: this.mute, click:() => { this.toggle_mute(); app.update_menu(); } };
  }
}

module.exports = new Reminder();
