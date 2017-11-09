const {app, Menu, Tray} = require('electron')
const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath("glyphs/t.891.png") // nativeImage.createEmpty()

function Clock()
{
  this.radius = 90;
  this.circ = this.radius * 2 * Math.PI;
  this.center = 105;
  this.show_pulse = false;

  this.start = function()
  {
    clock.update();
  }

  this.time = function()
  {
    var d = new Date(), e = new Date(d);
    var msSinceMidnight = e - d.setHours(0,0,0,0);
    var val = (msSinceMidnight/864) * 10;
    return parseInt(val);
  }

  this.toggle_pulse = function()
  {
    this.show_pulse = this.show_pulse ? false : true;
  }

  this.update = function()
  {
    setTimeout(function(){ clock.update(); }, 864.0);
  }

  this.format = function()
  {
    var t        = this.time();
    var t_s      = new String(t);

    return this.show_pulse ? t_s.substr(0,3)+":"+t_s.substr(3,3) : t_s.substr(0,3);
  }

  this.path = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    var t_a      = [t_s.substr(0,3),t_s.substr(3,3)];
    var w        = 30;
    var h        = 30;
    var needle_1 = parseInt(((t/1000000) % 1) * w);
    var needle_2 = parseInt(((t/100000) % 1) * h);
    var needle_3 = needle_1 + parseInt(((t/10000) % 1) * (w - needle_1));
    var needle_4 = needle_2 + parseInt(((t/10000) % 1) * (h - needle_2));
    var needle_5 = needle_3 + parseInt(((t/1000) % 1) * (w - needle_3));
    var needle_6 = needle_4 + parseInt(((t/100) % 1) * (h - needle_4));

    var path = "";
    path += "M"+needle_1+","+0+" L"+needle_1+","+h+" ";
    path += "M"+needle_1+","+needle_2+" L"+w+","+needle_2+" ";
    path += "M"+needle_3+","+needle_2+" L"+needle_3+","+h+" ";
    path += "M"+needle_3+","+needle_4+" L"+w+","+needle_4+" ";
    path += "M"+needle_5+","+needle_4+" L"+needle_5+","+h+" ";
    path += "M"+needle_5+","+needle_6+" L"+w+","+needle_6+" ";

    // Outline
    path += "M0.5,0.5 L"+(w-0.5)+",0.5 ";
    path += "M0.5,0.5 L0.5,"+(h-0.5)+" ";
    path += "M"+(w-0.5)+","+(h-0.5)+" L0.5,"+(h-0.5)+" ";
    path += "M"+(w-1)+","+(h-0.5)+" L"+(w-1)+",0.5 ";

    return path;
  }
}

let clock = new Clock()

app.on('ready', () => {

  var tray = new Tray(image)

  clock.start()

  tray.setTitle("---");

  var prev_beat = null;
  function update(force = false){
    var time = clock.format();
    var beat = time.substr(0,3);
    if(clock.show_pulse || force){
      tray.setTitle(" "+time);  
    }
    else if(prev_beat != beat){
      let image = nativeImage.createFromPath("glyphs/t."+beat+".png")
      tray.setImage(image);
      tray.setTitle(" "+time);
    }
    prev_beat = beat;
  }

  setInterval(update,86.40)

  tray.setHighlightMode(false)

  tray.on('click', function(e, bounds) {
    console.log(clock.path())
    clock.toggle_pulse();
    update(true)
  });

  update();
})




