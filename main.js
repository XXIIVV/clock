const {app, Menu, Tray} = require('electron')
const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath(app.getAppPath()+'/icon.png')
let clock = require('./clock.js')

app.on('ready', () => {

  app.dock.hide();

  clock.add_reminder("stand",45);
  clock.add_reminder("drink",30);
  clock.add_reminder("rest",15);

  var pomodoro = null;
  var show_pulse = false;

  image = image.resize({width:24,height:24})

  function toggle_pomodoro(beats = 1)
  {
    var minutes = (beats * 86.4)/100; 
    console.log(`${beats} beats - ${minutes} minutes`)
    if(!pomodoro){
      pomodoro = new Date(new Date().getTime() + (minutes*60000));
    }
    else{
      pomodoro = null;
    }
    update_menu();
  }

  function toggle_format()
  {
    show_pulse = show_pulse ? false : true;
    update_menu();
  }

  function update_menu()
  {
    var menu = Menu.buildFromTemplate([
      {label: '000:000', type: 'checkbox', checked: show_pulse, click:() => { toggle_format(); } },
      {label: pomodoro ? 'Stop Pomodoro' : 'Start Pomodoro', click:() => { toggle_pomodoro(); } },
      {label: 'Quit', click:() => { app.quit() }}
    ])
    tray.setContextMenu(menu)
  }

  function update(pulse)
  {
    var time = clock.format();
    var beat = time.substr(0,3);
    var event = clock.has_reminder();

    // Kill timer
    if(pomodoro && clock.time_left(pomodoro) < 0){
      pomodoro = null;
      update_menu();
    }

    if(pomodoro){
      tray.setTitle(`-${clock.time_left(pomodoro).toFixed(3).toString().replace(".",":")}`);
    }
    else if(event || show_pulse){
      tray.setTitle(`${time}${event ? "("+event+")" : ""}`);
    }
    else if(prev_beat != beat || !pulse){
      tray.setTitle(beat);
    }
    
    prev_beat = beat;
  }

  var prev_beat = null;

  var tray = new Tray(image)

  var menu = Menu.buildFromTemplate([
    {label: 'Quit', click:() => { app.quit() }}
  ])
  tray.setContextMenu(menu)

  update_menu();

  tray.setTitle("---");
  update_menu();

  setInterval(update,86.40);

  update(1);
})
