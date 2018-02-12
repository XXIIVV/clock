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
    var new_status = this.status;
    var time = clock.format()
    var event = reminder.any(clock.format().beat)
    var new_title = time.beat;

    // Kill timer
    if(pomodoro.is_expired()){
      pomodoro.stop();
      this.update_menu();
    }

    if(!this.decimal){
      var t = new Date();
      new_title = `${pad(t.getHours(),2)}:${pad(t.getMinutes(),2)}`
      new_status = "idle";
    }
    else if(pomodoro.target){
      new_title = `-${pomodoro}`
      new_status = "pomodoro";
    }
    else if(event){
      new_title = `${time.beat}:${time.pulse}${event ? "("+event+")" : ""}`
      new_status = "event";
    }
    else if(clock.show_pulse){
      new_title = `${time.beat}:${time.pulse}`
      new_status = "idle";
    }
    else {
      new_title = time.beat;
      new_status = "idle";
    }

    if(prev_title != new_title){
      prev_title = new_title;
      this.tray.setTitle(new_title)
    }

    this.update_status(new_status);
  }

  this.update_status = function(new_status)
  {
    if(new_status != this.status){
      console.log("Status change:",new_status)
      this.status = new_status;
      let image = nativeImage.createFromPath(app.getAppPath()+`/status.${this.status ? this.status : "idle"}.png`) 
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
