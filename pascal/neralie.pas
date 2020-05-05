program Neralie;
 const
  baseRes = 128;
  pad = 20;
  defWidth = 300;
  defHeight = 225;

  appleMenuID = baseRes;
  fileMenuID = baseRes + 1;
  viewMenuID = baseRes + 2;

  aboutItem = 1;
  closeItem = 1;
  quitItem = 2;
  lightItem = 1;
  darkItem = 2;

 var
  clockWindow: WindowPtr;
  r, display, bounds, minMaxSizeRect: Rect;
  curPulses: Longint;
  res, last: longInt;
  altMap, tempBits: BitMap;
  lightMode, quitting: Boolean;

 procedure UpdateLightDarkMarks;
  var
   handle: MenuHandle;
   lightMark, darkMark: Char;
 begin
  handle := GetMHandle(viewMenuID);
  if handle = nil then
   Exit(UpdateLightDarkMarks);
  CheckItem(handle, lightItem, lightMode);
  CheckItem(handle, darkItem, not lightMode);
 end;

 procedure GetClockWindowSize (var width, height: Integer);
  var
   bbox: Rect;
 begin
  bbox := WindowPeek(clockWindow)^.contRgn^^.rgnBBox;
  width := bbox.right - bbox.left;
  height := bbox.bottom - bbox.top;
 end;

 function GetContentRect: Rect;
  var
   r: Rect;
 begin
  r.left := 0;
  r.top := 0;
  GetClockWindowSize(r.right, r.bottom);
  GetContentRect := r;
 end;

 function GetFaceRect: Rect;
  var
   r: rect;
   width, height: Integer;
 begin
  GetClockWindowSize(width, height);
  SetRect(r, pad, pad, width - pad, height - pad);
  if (r.right < r.left) or (r.bottom < r.top) then
   SetRect(r, 0, 0, 0, 0);
  GetFaceRect := r;
 end;

 function NeralieOf (dtr: DateTimeRec): Longint;
  var
   mins, a: Longint;
 begin
  mins := Longint(dtr.hour * 60 + dtr.minute) * 100;
  a := mins mod 144 * 60 * 100 + Longint(dtr.second) * 10000;
  NeralieOf := mins div 144 * 1000 + a div 864;
 end;

 procedure CheckAltMapBufferSize;
  var
   width, height: Integer;
   newRowBytes: Longint;
 begin
  GetClockWindowSize(width, height);
  width := width - pad * 2;
  height := height - pad * 2;
  if width < 0 then
   width := 0;
  if height < 0 then
   height := 0;
  if (altMap.bounds.right = width) and (altMap.bounds.bottom = height) then
   Exit(CheckAltMapBufferSize);
  altMap.bounds.right := width;
  altMap.bounds.bottom := height;
  newRowBytes := (width + 15) div 16 * 2;
  if altMap.baseAddr <> nil then
   DisposePtr(altMap.baseAddr);
  altMap.rowBytes := newRowBytes;
  if altMap.rowBytes < 1 then
   begin
    altMap.rowBytes := 0;
    altMap.baseAddr := nil;
    Exit(CheckAltMapBufferSize);
   end;
  altMap.rowBytes := newRowBytes;
  altMap.baseAddr := NewPtr(altMap.rowBytes * Longint(height));
  if altMap.baseAddr = nil then
   altMap.rowBytes := 0;
  curPulses := -1; {Kinda hacky}
 end;

 function GetPulses: Longint;
  var
   dtr: DateTimeRec;
 begin
  GetTime(dtr);
  GetPulses := NeralieOf(dtr);
 end;

 function GetFg: Pattern;
 begin
  if lightMode then
   GetFg := black
  else
   GetFg := white;
 end;
 function GetBg: Pattern;
 begin
  if lightMode then
   GetBg := white
  else
   GetBg := black;
 end;

 procedure PaintEmptyAreas;
  var
   r: Rect;
   width, height: Integer;
 begin
  PenPat(GetBg);
  GetClockWindowSize(width, height);
  SetRect(r, 0, 0, width, pad);
  PaintRect(r);
  SetRect(r, 0, pad, pad, height - pad);
  PaintRect(r);
  SetRect(r, width - pad, pad, width, height - pad);
  PaintRect(r);
  SetRect(r, 0, height - pad, width, height);
  PaintRect(r);
 end;

 procedure DrawNeedles (bounds: rect; a, b, c, d, e, f: real);
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

 procedure CopyAltBuffer;
  var
   r: Rect;
 begin
  r := GetFaceRect;
  CopyBits(altMap, thePort^.portBits, altMap.bounds, r, srcCopy, nil);
 end;

 procedure UpdateTitle;
  var
   beat, pulse: Str255;
 begin
  NumToString(round(curPulses / 1000) mod 1000, beat);
  NumToString(round(curPulses) mod 1000, pulse);
  SetWTitle(clockWindow, concat(beat, ':', pulse));
 end;

 procedure Draw;
  var
   newPulses: Longint;
 begin
  CheckAltMapBufferSize;
  newPulses := GetPulses;
  if curPulses <> newPulses then
   begin
    curPulses := newPulses;
    tempBits := thePort^.portBits;
    SetPortBits(altMap);
    PenPat(GetBg);
    PaintRect(altMap.bounds);
    PenPat(GetFg);
    FrameRect(altMap.bounds);
    DrawNeedles(altMap.bounds, curPulses / 1000000, (curPulses mod 100000) / 100000, (curPulses mod 10000) / 10000, (curPulses mod 1000) / 1000, (curPulses mod 100) / 100, (curPulses mod 10) / 10);
    SetPortBits(tempBits);
    UpdateTitle;
   end;
  CopyAltBuffer;
 end;

 procedure Redraw;
 begin
  PaintEmptyAreas;
  Draw;
 end;

 procedure ScheduleFullRedraw;
  var
   r: Rect;
 begin
  r := GetContentRect;
  curPulses := -1; {Kinda hacky}
  InvalRect(r);
 end;

 procedure SetLightMode (newLightMode: Boolean);
 begin
  if newLightMode = lightMode then
   Exit(SetLightMode);
  lightMode := newLightMode;
  ScheduleFullRedraw;
  UpdateLightDarkMarks;
 end;

 procedure OnMenuChoice (menuChoice: Longint);
  var
   dummy: Longint;
   itemChoice: Integer;
   appleMenuH: MenuHandle;
   itemName: Str255;
 begin
  if menuChoice = 0 then
   Exit(OnMenuChoice);
  itemChoice := LoWord(menuChoice);
  case HiWord(menuChoice) of
   appleMenuID: 
    case itemChoice of
     aboutItem: 
      dummy := Alert(baseRes, nil);
     otherwise
      begin
       appleMenuH := GetMHandle(appleMenuID);
       GetItem(appleMenuH, itemChoice, itemName);
       dummy := OpenDeskAcc(itemName);
      end;
    end;
   fileMenuID: 
    case itemChoice of
     closeItem, quitItem: 
      quitting := True;
     otherwise
      ;
    end;
   viewMenuID: 
    case itemChoice of
     lightItem: 
      SetLightMode(True);
     darkItem: 
      SetLightMode(False);
     otherwise
      ;
    end;
   otherwise
    ;
  end;
  HiliteMenu(0);
 end;

 procedure OnMouseDown (event: EventRecord);
  var
   someWindow: WindowPtr;
   partOfWindow: Integer;
   tmp: Longint;
   r: Rect;
 begin
  partOfWindow := FindWindow(event.where, someWindow);
  case partOfWindow of
   inMenuBar: 
    OnMenuChoice(MenuSelect(event.where));
   inSysWindow: 
    SystemClick(event, someWindow);
   inContent: 
    begin
     SelectWindow(someWindow);
     if someWindow = clockWindow then
      begin
       Redraw;
       tmp := GrowWindow(clockWindow, event.where, minMaxSizeRect);
       if tmp <> 0 then
       begin
       SizeWindow(clockWindow, LoWord(tmp), HiWord(tmp), False);
       curPulses := -1; {Kinda hacky}
       SetRect(r, 0, 0, LoWord(tmp), HiWord(tmp));
       InvalRect(r);
       end
      end;
    end;
   inDrag: 
    begin
     SelectWindow(someWindow);
     Redraw;
     DragWindow(someWindow, event.where, screenBits.bounds);
    end;
   inGoAway: 
    if TrackGoAway(someWindow, event.where) then
     quitting := quitting or (someWindow = clockWindow);
   otherwise
    ;
  end;
 end;

 procedure DispatchEvent;
  var
   theChar: Char;
   dummy: Boolean;
   theEvent: EventRecord;
 begin
  dummy := WaitNextEvent(everyEvent, theEvent, 10, nil);
  case theEvent.what of
   nullEvent: 
    if curPulses <> GetPulses then
     InvalRect(GetFaceRect);
   mouseDown: 
    OnMouseDown(theEvent);
   keyDown, autoKey: 
    begin
     theChar := CHR(BitAnd(theEvent.message, charCodeMask));
     if BitAnd(theEvent.modifiers, cmdKey) <> 0 then
      OnMenuChoice(MenuKey(theChar));
    end;
   activateEvt: 
    ScheduleFullRedraw;
   updateEvt: 
    if WindowPtr(theEvent.message) = clockWindow then
     begin
      BeginUpdate(clockWindow);
      Redraw;
      EndUpdate(clockWindow);
     end;
   otherwise
    ;
  end;
 end;

 procedure MenuBarInit;
  var
   bar: Handle;
   menu: MenuHandle;
 begin
  bar := GetNewMBAR(baseRes);
  if bar = nil then
   Exit(MenuBarInit);
  SetMenuBar(bar);
  DisposeHandle(bar);
  AppendMenu(GetMenu(appleMenuID), 'DRVR');
  DrawMenuBar;
 end;

begin
 MenuBarInit;
 SetRect(r, 150, 125, 150 + defWidth, 125 + defHeight);
 curPulses := -1;
 quitting := False;
 altMap.rowBytes := 0;
 lightMode := False;
 SetRect(minMaxSizeRect, pad * 3, pad * 3, 5000, 5000);
 SetRect(altMap.bounds, 0, 0, 0, 0);
 altMap.baseAddr := nil;
 clockWindow := NewWindow(nil, r, 'Neralie', True, noGrowDocProc, WindowPtr(-1), True, 0);
 SetPort(clockWindow);
 SetRect(display, 0, 0, r.right - r.left, r.bottom - r.top);
 SetRect(bounds, pad, pad, display.right - pad, display.bottom - pad);
 ScheduleFullRedraw;
 UpdateLightDarkMarks;
 SetCursor(arrow);
 while not quitting do
  DispatchEvent;
 if altMap.baseAddr <> nil then
  DisposePtr(altMap.baseAddr);
end.
