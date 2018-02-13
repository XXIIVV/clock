function Entaloneralie()
{
  this.clock = new Clock();

  this.el = document.createElement("yu");

  this.size = {width:400,height:400};

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
    var w        = this.size.width;
    var h        = this.size.height;
    var needle_1 = (((t/1000000) % 1) * h);
    var needle_2 = (((t/100000) % 1) * w);
    var needle_3 = needle_1 + (((t/10000) % 1) * (h - needle_1));
    var needle_4 = needle_2 + (((t/10000) % 1) * (w - needle_2));
    var needle_5 = needle_3 + (((t/1000) % 1) * (h - needle_3));
    var needle_6 = needle_4 + (((t/100) % 1) * (w - needle_4));

    var path = "";
    // path += "M"+needle_1+","+0+" L"+needle_1+","+h+" ";
    // path += "M"+needle_1+","+needle_2+" L"+w+","+needle_2+" ";
    // path += "M"+needle_3+","+needle_2+" L"+needle_3+","+h+" ";

    // path += "M"+needle_3+","+needle_4+" L"+w+","+needle_4+" ";
    // path += "M"+needle_5+","+needle_4+" L"+needle_5+","+h+" ";
    // path += "M"+needle_5+","+needle_6+" L"+w+","+needle_6+" ";

    path += `
    M0,${needle_1} L${w},${needle_1} 
    M${needle_2},${needle_1} L${needle_2},${h} 
    M${needle_2},${needle_3} L${w},${needle_3} 
    `;

    return path;
  }

  this.digits = function()
  {
    var html = ""

    var t        = this.time();
    var t_s      = new String(t);
    var w        = this.size.width;
    var h        = this.size.height;
    var needle_1 = (((t/1000000) % 1) * h);
    var needle_2 = (((t/100000) % 1) * w);
    var needle_3 = needle_1 + (((t/10000) % 1) * (h - needle_1));

    html += `<text x='0' y='${needle_1}'>${t_s.substr(0,1)}</text>`;
    html += `<text x='${needle_2}' y='15'>${t_s.substr(1,1)}</text>`;
    html += `<text x='${w-15}' y='${needle_3}'>${t_s.substr(2,1)}</text>`;
    return html;
  }

  this.update = function()
  {
    var w = this.size.width;
    var h = this.size.height;
    this.el.innerHTML = `<svg id='ental' width="${w}" height="${h}"><path d="${this.path()}"></path>${this.digits()}</svg>`;
  }
}