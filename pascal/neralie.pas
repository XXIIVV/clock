program Neralie;

 const
  pad = 20;
  width = 400;
  height = 200;

 var
  view, display, bounds: Rect;
  dtr: DateTimeRec;
  res, last: longInt;
  altMap, tempBits: BitMap;

 procedure Init;
 begin
  ShowDrawing;
  GetDrawingRect(view);
  SetRect(view, view.left, view.top, view.right, view.bottom);
  SetDrawingRect(view);
  SetRect(display, 0, 0, view.right - view.left - 15, view.bottom - view.top - 15);
  SetRect(bounds, pad, pad, display.right - pad, display.bottom - pad);
  altMap.rowBytes := (width + 15) div 16 * 2;
  altMap.bounds := bounds;
  altMap.baseAddr := NewPtr(altMap.rowBytes * height);
  PenPat(black);
  PaintRect(display);
 end;

 procedure Draw (bounds: rect; a, b, c, d, e, f: real);
  var
   x, y: integer;
 begin
  y := pad;
  x := bounds.left;
  y := round(a * (bounds.bottom - y) + y);
  drawLine(x, y, bounds.right - 1, y);
  x := round(b * (bounds.right - x) + x);
  drawLine(x, y, x, bounds.bottom - 1);
  y := round(c * (bounds.bottom - y) + y);
  drawLine(x, y, bounds.right - 1, y);
  x := round(d * (bounds.right - x) + x);
  drawLine(x, y, x, bounds.bottom - 1);
  y := round(e * (bounds.bottom - y) + y);
  drawLine(x, y, bounds.right - 1, y);
  x := round(f * (bounds.right - x) + x);
  drawLine(x, y, x, bounds.bottom - 1);
 end;

 function toNeralie (dtr: DateTimeRec): Longint;
  var
   mins, a: Longint;
 begin
  mins := Longint(dtr.hour * 60 + dtr.minute) * 100;
  a := mins mod 144 * 60 * 100 + Longint(dtr.second) * 10000;
  toNeralie := mins div 144 * 1000 + a div 864;
 end;

begin

 Init;

 while not button do
  begin
   GetTime(dtr);
   if dtr.second <> last then
    begin
     PenPat(black);
     tempBits := thePort^.portBits;
     SetPortBits(altMap);
     PaintRect(bounds);
     PenPat(white);
     FrameRect(bounds);
     res := toNeralie(dtr);
     Writeln(res);
     Draw(bounds, res / 1000000, (res mod 100000) / 100000, (res mod 10000) / 10000, (res mod 1000) / 1000, (res mod 100) / 100, (res mod 10) / 10);
     SetPortBits(tempBits);
     CopyBits(altMap, thePort^.portBits, bounds, bounds, srcCopy, nil);
    end;
   last := dtr.second;
  end;
 DisposePtr(altMap.baseAddr);
end.