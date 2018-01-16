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

  this.tray = new Tray(image)

  reminder.add("stand",45)
  reminder.add("drink",30)
  reminder.add("rest",15)

  this.update_menu = function()
  {
    var menu = Menu.buildFromTemplate([clock.menu(this),pomodoro.menu(this),calendar.menu(this),{label: 'Quit', click:() => { app.quit() }}])
    this.tray.setContextMenu(menu)
  }

  var prev_beat = null

  this.update_title = function(pulse)
  {
    var time = clock.format()
    var event = reminder.any()

    // Kill timer
    if(pomodoro.is_expired()){
      pomodoro.stop();
    }

    if(pomodoro.target){
      this.tray.setTitle(`-${pomodoro}`)
    }
    else if(event || clock.show_pulse){
      this.tray.setTitle(`${time.beat}:${time.pulse}${event ? "("+event+")" : ""}`)
    }
    else if(prev_beat != time.beat || !pulse){
      this.tray.setTitle(time.beat)
    }

    this.update_status();
    
    prev_beat = time.beat
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

  setInterval(() => { this.update_title() },86.40)

  this.update_title(1)
  this.update_menu()
})
