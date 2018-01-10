const {app, Menu, Tray} = require('electron')
const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath('./icon.png')
let clock = require('./clock.js')

app.on('ready', () => {

  clock.add_reminder("stand",30);
  clock.add_reminder("drink",20);
  clock.add_reminder("rest",10);

  image = image.resize({width:24,height:24})

  function update(pulse)
  {
    var time = clock.format();
    var beat = time.substr(0,3);
    var event = clock.has_reminder();

    if(event || menu && menu.items[1].checked){
      tray.setTitle(`${time}${event ? "("+event+")" : ""}`);
    }
    else if(prev_beat != beat || pulse == 1){
      tray.setTitle(beat);
    }
    
    prev_beat = beat;
  }

  var prev_beat = null;

  var tray = new Tray(image)

  var menu = Menu.buildFromTemplate([
    {label: '000', type: 'radio', checked: true, click:function(){ update(1) } },
    {label: '000:000', type: 'radio', click:function(){ update(2) } },
    {label: 'Quit', click:function(){ app.quit(); } }
  ])

  tray.setContextMenu(menu)

  tray.setTitle("---");

  setInterval(update,86.40)

  update(1);
})
