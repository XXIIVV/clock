function Pomodoro()
{
  this.clock = null;
  this.target = null;

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

  this.toggle = function()
  {
    if(this.target){
      this.stop();
    }
    else{
      this.start();
    }
  }

  this.offset = function()
  {
    if(!this.target){ return null; }

    var offset_sec = this.target - new Date();
    var minutes = offset_sec/60000;
    var beats = (minutes * (1/86.4))*100;
    return beats;
  }

  this.toString = function()
  {
    return this.offset().toFixed(3).toString().replace(".",":")
  }
}

module.exports = new Pomodoro();