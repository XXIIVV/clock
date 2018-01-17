const {app, Menu, Tray} = require('electron')
const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath(app.getAppPath()+'/status.event.png') 
    image = image.resize({width:20,height:20})

let clock     = require('./sources/clock')
let pomodoro  = require('./sources/pomodoro')
let reminder  = require('./sources/reminder')
let calendar  = require('./sources/calendar')

app.on('ready', () => {

  app.dock.hide()
  app.status = "idle";
  this.decimal = true;

  this.tray = new Tray(image)

  this.tray.on('right-click', () => { this.toggle_format(); this.update(); });

  reminder.add("stand",45)
  reminder.add("drink",30)
  reminder.add("rest",15)

  this.toggle_format = function()
  {
    console.log("Toggle format");
    this.decimal = this.decimal ? false : true;
  }

  this.update = function()
  {
    this.update_menu(); 
    this.update_title(); 
    this.update_status();
  }

  this.update_menu = function()
  {
    var menu = Menu.buildFromTemplate([clock.menu(this),pomodoro.menu(this),calendar.menu(this),{label: 'Quit', click:() => { app.quit() }}])
    this.tray.setContextMenu(menu)
  }

  var prev_title = null

  this.update_title = function(pulse)
  {
    var time = clock.format()
    var event = reminder.any()
    var new_title = time.beat;

    // Kill timer
    if(pomodoro.is_expired()){
      pomodoro.stop();
    }

    if(!this.decimal){
      var t = new Date();
      new_title = `${pad(t.getHours(),2)}:${pad(t.getMinutes(),2)}`
    }
    else if(pomodoro.target){
      new_title = `-${pomodoro}`
    }
    else if(event || clock.show_pulse){
      new_title = `${time.beat}:${time.pulse}${event ? "("+event+")" : ""}`
    }
    else {
      new_title = time.beat;
    }

    if(prev_title != new_title){
      prev_title = new_title;
      this.tray.setTitle(new_title)
    }

    this.update_status();
  }

  this.update_status = function()
  {
    var new_status = this.status;

    if(pomodoro.target){
      new_status = "pomodoro";
    }
    else if(reminder.any()){
      new_status = "event";
    }
    else{
      new_status = "idle";
    }

    if(new_status != this.status){
      console.log("Status change:",new_status)
      this.status = new_status;
      let image = nativeImage.createFromPath(app.getAppPath()+`/status.${this.status}.png`) 
      image = image.resize({width:20,height:20})
      this.tray.setImage(image);
    }
  }

  function pad(n, width, z = "0")
  {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  setInterval(() => { this.update_title() },86.40)

  this.update_title(1)
  this.update_menu()
})
