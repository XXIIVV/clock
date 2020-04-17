program Neralie;

 const
  pad = 20;
  x = 60;
  y = 60;
  width = 300;
  height = 200;

 var
  view, display, bounds: Rect;
  dtr: DateTimeRec;
  res, last: longInt;

{>> Draw }
 procedure draw (bounds: rect; a, b, c, d, e, f: real);
  var
   x, y, prev: integer;
 begin
  y := pad;
  x := bounds.left;
{a}
  y := round(a * (bounds.bottom - y) + y);
  drawLine(x, y, bounds.right - 1, y);
{b}
  x := round(b * (bounds.right - x) + x);
  drawLine(x, y, x, bounds.bottom - 1);
{c}
  y := round(c * (bounds.bottom - y) + y);
  drawLine(x, y, bounds.right - 1, y);
{d}
  x := round(d * (bounds.right - x) + x);
  drawLine(x, y, x, bounds.bottom - 1);
{e}
  y := round(e * (bounds.bottom - y) + y);
  drawLine(x, y, bounds.right - 1, y);
{f}
  x := round(f * (bounds.right - x) + x);
  drawLine(x, y, x, bounds.bottom - 1);
 end;

{>> toNeralie }
 function toNeralie (dtr: DateTimeRec): LongInt;
  var
   seconds: LongInt;
   ratio: extended;
 begin
  seconds := 3600;
  seconds := seconds * dtr.hour;
  seconds := seconds + dtr.minute * 60;
  seconds := seconds + dtr.second;
  ratio := seconds / 86400;
  toNeralie := round(ratio * 1000000);
 end;

begin

 ShowDrawing;

 setRect(view, x, y, x + width, y + height);
 setDrawingRect(view);

 setRect(display, 0, 0, view.right - view.left - 15, view.bottom - view.top - 15);
 setRect(bounds, pad, pad, display.right - pad, display.bottom - pad);

 while not button do
  begin

   GetTime(dtr);
   if dtr.second <> last then
    begin
     penPat(black);
     paintRect(display);
     penPat(white);
     frameRect(bounds);
     res := toNeralie(dtr);
     writeln(res);
     draw(bounds, res / 1000000, (res mod 100000) / 100000, (res mod 10000) / 10000, (res mod 1000) / 1000, (res mod 100) / 100, (res mod 10) / 10);
    end;
   last := dtr.second;
  end;

end.