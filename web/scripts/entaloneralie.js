function Entaloneralie () {
  this.arvelie = new Arvelie()
  this.neralie = new Neralie()

  this.el = document.createElement('canvas')
  this.el.id = 'ental'

  this.scale = window.devicePixelRatio
  this.size = { width: window.innerWidth, height: window.innerHeight }
  this.style = { padding: 35 * this.scale, font_size: 10 * this.scale, stroke_width: 1.5 }
  this.fps = 60

  this.start = function () {
    document.body.appendChild(this.el)
    this.animate()
  }

  this.animate = function () {
    setTimeout(() => { entaloneralie.update(); requestAnimationFrame(entaloneralie.animate) }, 1000 / entaloneralie.fps)
  }

  this.context = function () {
    return this.el.getContext('2d')
  }

  this.clear = function () {
    this.context().clearRect(0, 0, this.size.width * this.scale, this.size.height * this.scale)
  }

  this.drawDigits = function () {
    var t = this.neralie.toInteger()
    var w = this.size.width * this.scale
    var h = this.size.height * this.scale
    var pad = this.style.padding
    var needle_1 = parseInt(((t / 1000000) % 1) * (h - (pad * 2))) + pad
    var needle_2 = parseInt(((t / 100000) % 1) * (w - (pad * 2))) + pad
    var needle_3 = needle_1 + parseInt(((t / 10000) % 1) * (h - pad - needle_1))
    var font_size = this.style.font_size
    var ctx = this.context()
    ctx.font = `${font_size}px input_mono_regular`
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'right'
    ctx.fillText(`${t}`.substr(0, 1), pad * 0.75, needle_1 - (font_size / 2))
    ctx.textAlign = 'center'
    ctx.fillText(`${t}`.substr(1, 1), needle_2, (pad / 2) + (font_size * 0.25))
    ctx.textAlign = 'left'
    ctx.fillText(`${t}`.substr(2, 1), w - (pad * 0.75), needle_3 - (font_size / 2))
    ctx.textAlign = 'center'
    ctx.fillText(`${this.arvelie} ${this.neralie}`, w / 2, h - (pad * 0.75))
  }

  this.drawPath = function () {
    var ctx = this.context()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = this.style.stroke_width
    ctx.stroke(new Path2D(this.path()))
    ctx.beginPath()
    ctx.setLineDash([2, 5 * this.scale])
    ctx.stroke(new Path2D(this.path(true)))
  }

  this.path = function (second_needle = false) {
    var t = this.neralie.toInteger()
    var w = this.size.width * this.scale
    var h = this.size.height * this.scale
    var pad = this.style.padding
    var needle_1 = parseInt(((t / 1000000) % 1) * (h - (pad * 2))) + pad
    var needle_2 = parseInt(((t / 100000) % 1) * (w - (pad * 2))) + pad
    var needle_3 = needle_1 + parseInt(((t / 10000) % 1) * (h - pad - needle_1))
    var needle_4 = needle_2 + parseInt(((t / 1000) % 1) * (w - pad - needle_2))
    var needle_5 = needle_3 + parseInt(((t / 100) % 1) * (h - pad - needle_3))
    var needle_6 = needle_4 + parseInt(((t / 10) % 1) * (w - pad - needle_4))
    var path = `M${pad},${needle_1} L${w - pad},${needle_1} M${needle_2},${needle_1} L${needle_2},${h - pad} M${needle_2},${needle_3} L${w - pad},${needle_3} M${needle_4},${needle_3} L${needle_4},${h - pad} M${needle_4},${needle_5} L${w - pad},${needle_5} M${needle_6},${needle_5} L${needle_6},${h - pad} `
    return second_needle ? `M${needle_2},${pad} L ${needle_2},${needle_1}` : `${path} M${pad},${pad} L${w - pad},${pad} L${w - pad},${h - pad} L${pad},${h - pad} Z`
  }

  this.update = function () {
    this.size = { width: window.innerWidth, height: window.innerHeight }
    this.el.width = this.size.width * this.scale
    this.el.height = this.size.height * this.scale

    this.clear()
    this.drawPath()
    this.drawDigits()
  }

  window.onresize = (event) => {
    this.update()
  }
}
