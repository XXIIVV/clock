function Pomodoro()
{
  this.target = null;

  this.toggle_target = function()
  {
    if(this.target){
      this.stop();
    }
    else{
      this.start();
    }
  }

  this.start = function(beats = 30)
  {
    var minutes = (beats * 86.4)/100; 
    console.log(`${beats} beats - ${minutes} minutes`)
    this.target = new Date(new Date().getTime() + (minutes*60000));
  }

  this.stop = function()
  {
    this.target = null;
  }

  this.offset = function()
  {
    if(!this.target){ return null; }

    var offset_sec = this.target - new Date();
    var minutes = offset_sec/60000;
    var beats = (minutes * (1/86.4))*100;
    return beats;
  }

  this.is_expired = function()
  {
    return this.target && this.offset() < 0 ? true : false
  }

  this.toString = function()
  {
    return this.offset().toFixed(3).toString().replace(".",":")
  }

  this.menu = function(app)
  {
    return {label: this.target ? 'Stop Pomodoro' : 'Start Pomodoro', click:() => { this.toggle_target(); app.update_menu(); } }
  }
}

module.exports = new Pomodoro();