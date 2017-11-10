const {app, Menu, Tray} = require('electron')
const nativeImage = require('electron').nativeImage
let image = nativeImage.createEmpty()

function Clock()
{
  this.radius = 90;
  this.circ = this.radius * 2 * Math.PI;
  this.center = 105;

  this.time = function()
  {
    var d = new Date(), e = new Date(d);
    var msSinceMidnight = e - d.setHours(0,0,0,0);
    var val = (msSinceMidnight/864) * 10;
    return parseInt(val);
  }

  this.format = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    return t_s.substr(0,3)+":"+t_s.substr(3,3);
  }
}

let clock = new Clock()

app.on('ready', () => {

  function update(pulse)
  {
    var time = clock.format();
    var beat = time.substr(0,3);
    if(menu && menu.items[1].checked){
      tray.setTitle(time);
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
