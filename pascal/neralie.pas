program Neralie;

 const
  pad = 20;
  x = 60;
  y = 60;
  width = 600;
  height = 400;

 var
  view, display, bounds: Rect;

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

begin

 ShowDrawing;
 setRect(view, x, y, x + width, y + height);
 setDrawingRect(view);

 setRect(display, 0, 0, view.right - view.left - 15, view.bottom - view.top - 15);
 setRect(bounds, pad, pad, display.right - pad, display.bottom - pad);
 paintRect(display);

 penPat(white);

 frameRect(bounds);
 draw(bounds, 0.8, 0.3, 0.2, 0.4, 0.9, 0.2);

end.