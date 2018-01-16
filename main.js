const {app, Menu, Tray} = require('electron')
const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath(app.getAppPath()+'/icon.png') 
    image = image.resize({width:24,height:24})

let clock     = require('./sources/clock')
let pomodoro  = require('./sources/pomodoro')
let reminder  = require('./sources/reminder')
let calendar  = require('./sources/calendar')

app.on('ready', () => {

  app.dock.hide()

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
    
    prev_beat = time.beat
  }

  setInterval(() => { this.update_title() },86.40)

  this.update_title(1)
  this.update_menu()
})
