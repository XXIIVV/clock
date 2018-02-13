function Entaloneralie()
{
  this.clock = new Clock();

  this.el = document.createElement("canvas"); 
  this.size = {width:window.innerWidth,height:window.innerHeight};
  this.el.id = "ental";
  this.el.width = this.size.width * 2;
  this.el.height = this.size.height * 2;

  this.start = function()
  {
    console.log("Started")
    document.body.appendChild(this.el);
    
    setInterval(() => { this.update(); },17);
  }

  this.time = function()
  {
    var d = new Date(), e = new Date(d);
    var msSinceMidnight = e - d.setHours(0,0,0,0);
    var val = (msSinceMidnight/864) * 10;
    return (val);
  }

  this.path = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    var t_a      = [t_s.substr(0,3),t_s.substr(3,3)];
    var w        = this.size.width * 2;
    var h        = this.size.height * 2;
    var pad      = 60;
    var needle_1 = parseInt(((t/1000000) % 1) * (h - (pad*2))) + pad;
    var needle_2 = parseInt(((t/100000) % 1) * (w - (pad*2))) + pad;
    var needle_3 = needle_1 + parseInt(((t/10000) % 1) * ((h - (pad*2)) - needle_1)) + pad;
    var needle_4 = needle_2 + parseInt(((t/10000) % 1) * ((w - (pad*2)) - needle_2)) + pad;
    var needle_5 = needle_3 + parseInt(((t/1000) % 1) * ((h - (pad*2)) - needle_3)) + pad;
    var needle_6 = needle_4 + parseInt(((t/100) % 1) * ((w - (pad*2)) - needle_4)) + pad;

    var path = `M${pad},${needle_1} L${w-pad},${needle_1} M${needle_2},${needle_1} L${needle_2},${h-pad} M${needle_2},${needle_3} L${w-pad},${needle_3} M${needle_4},${needle_3} L${needle_4},${h-pad} M${needle_4},${needle_5} L${w-pad},${needle_5} M${needle_6},${needle_5} L${needle_6},${h-pad} `;

    return `${path} M${pad},${pad} L${w-pad},${pad} L${w-pad},${h-pad} L${pad},${h-pad} Z`;
  }

  this.digits = function()
  {
    var html = ""

    var t        = this.time();
    var t_s      = new String(t);
    var w        = this.size.width * 2;
    var h        = this.size.height * 2;
    var needle_1 = (((t/1000000) % 1) * h);
    var needle_2 = (((t/100000) % 1) * w);
    var needle_3 = needle_1 + (((t/10000) % 1) * (h - needle_1));

    html += `<text x='0' y='${needle_1}'>${t_s.substr(0,1)}</text>`;
    html += `<text x='${needle_2}' y='15'>${t_s.substr(1,1)}</text>`;
    html += `<text x='${w-15}' y='${needle_3}'>${t_s.substr(2,1)}</text>`;

    html += `<text x='${w/2}' y='${h}'>${t_s.substr(0,3)}:${t_s.substr(3,3)}</text>`;
    return html;
  }

  this.context = function()
  {
    return this.el.getContext('2d');
  }

  this.clear = function()
  {
    var ctx = this.context();

    ctx.clearRect(0, 0, this.size.width*2, this.size.height*2);
  }

  this.draw_digits = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    var w        = this.size.width;
    var h        = this.size.height;
    var needle_1 = (((t/1000000) % 1) * h);
    var needle_2 = (((t/100000) % 1) * w);
    var needle_3 = needle_1 + (((t/10000) % 1) * (h - needle_1));

    var ctx = this.context();
    ctx.font         = '20px input_mono_regular';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText  (t_s.substr(0,1), 0, needle_1*2);
    ctx.fillText  (t_s.substr(1,1), needle_2*2, 0);
    ctx.fillText  (t_s.substr(2,1), (w*2)-20, needle_3*2);
  }

  this.update = function()
  {
    this.clear();

    var w = this.size.width;
    var h = this.size.height;

    var ctx = this.context();
    var p = new Path2D(this.path());
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke(p);

    this.draw_digits();
  }
}