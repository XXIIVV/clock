const {app, Menu, Tray} = require('electron')
const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath(app.getAppPath()+'/icon.png')
let clock = require('./clock.js')

app.on('ready', () => {

  app.dock.hide();

  clock.reminder.add("stand",45);
  clock.reminder.add("drink",30);
  clock.reminder.add("rest",15);

  var show_pulse = false;

  image = image.resize({width:24,height:24})

  function toggle_format()
  {
    show_pulse = show_pulse ? false : true;
    update_menu();
  }

  function update_menu()
  {
    var menu = Menu.buildFromTemplate([
      {label: '000:000', type: 'checkbox', checked: show_pulse, click:() => { toggle_format(); } },
      {label: clock.pomodoro.target ? 'Stop Pomodoro' : 'Start Pomodoro', click:() => { clock.pomodoro.toggle(); update_menu(); } },
      {label: 'Quit', click:() => { app.quit() }}
    ])
    tray.setContextMenu(menu)
  }

  function update(pulse)
  {
    var time = clock.format();
    var beat = time.substr(0,3);
    var event = clock.reminder.any();

    // Kill timer
    if(clock.pomodoro.target && clock.pomodoro.offset() < 0){
      update_menu();
    }

    if(clock.pomodoro.target){
      tray.setTitle(`-${clock.pomodoro}`);
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
