program Neralie;

 const
  BASE_RES_ID = 400;
  SLEEP = 60;
  WNE_TRAP_NUM = $60;
  UNIMPL_TRAP_NUM = $9F;
  QUIT_ITEM = 1;
  ABOUT_ITEM = 1;
  APPLE_MENU_ID = BASE_RES_ID;
  FILE_MENU_ID = BASE_RES_ID + 1;
  EDIT_MENU_ID = BASE_RES_ID + 2;
  VIEW_MENU_ID = BASE_RES_ID + 3;
  ABOUT_ALERT = 400;
  PAD = 20;

 var
  gClockWindow: WindowPtr;
  gDone, gWNEimplemented: BOOLEAN;
  gCurrentTime, gOldTime: LONGINT;
  gTheEvent: EventRecord;

  r, display, bounds, inbounds: Rect;
  dtr: DateTimeRec;
  inverted: BOOLEAN;

{>>}
 function ToNeralie (dtr: DateTimeRec): Longint;
  var
   mins, a: Longint;
 begin
  mins := Longint(dtr.hour * 60 + dtr.minute) * 100;
  a := mins mod 144 * 60 * 100 + Longint(dtr.second) * 10000;
  toNeralie := mins div 144 * 1000 + a div 864;
 end;

{>>}
 procedure UpdateFrame;
 begin
  if inverted = true then
   PenPat(white)
  else
   PenPat(black);
  PaintRect(display);
  if inverted = true then
   PenPat(black)
  else
   PenPat(white);
  FrameRect(bounds);
 end;

{>>}
 procedure Draw (bounds: rect; a, b, c, d, e, f: real);
  var
   x, y: integer;
 begin
  y := PAD;
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

{>>}
 procedure UpdateNeedles;
  var
   res: longInt;
 begin
  GetTime(dtr);
  if inverted = true then
   PenPat(white)
  else
   PenPat(black);
  PaintRect(inbounds);
  if inverted = true then
   PenPat(black)
  else
   PenPat(white);
  res := toNeralie(dtr);
  writeln(res);
  Draw(bounds, res / 1000000, (res mod 100000) / 100000, (res mod 10000) / 10000, (res mod 1000) / 1000, (res mod 100) / 100, (res mod 10) / 10);
 end;

{>>}
 procedure Invert;
 begin
  if inverted = true then
   inverted := false
  else
   inverted := true;
  UpdateFrame;
  UpdateNeedles;
 end;

{>>}
 procedure Expand;
 begin
{TODO}
 end;

{>>}
 procedure HandleAppleChoice (theItem: INTEGER);
  var
   accName: Str255;
   accNumber, itemNumber, dummy: INTEGER;
   appleMenu: MenuHandle;
 begin
  case theItem of
   ABOUT_ITEM: 
    dummy := NoteAlert(ABOUT_ALERT, nil);
   otherwise
    begin
     appleMenu := GetMHandle(APPLE_MENU_ID);
     GetItem(appleMenu, theItem, accName);
     accNumber := OpenDeskAcc(accName);
    end;
  end;
 end;

{>>}
 procedure HandleFileChoice (theItem: INTEGER);
 begin
  case theItem of
   QUIT_ITEM: 
    gDone := TRUE;
  end;
 end;

{>>}
 procedure HandleViewChoice (theItem: INTEGER);
  var
   fontNumber: INTEGER;
   fontName: Str255;
   fontMenu: MenuHandle;
 begin
  if theItem = 1 then
   Invert;
 end;

{>>}
 procedure HandleMenuChoice (menuChoice: LONGINT);
  var
   theMenu, theItem: INTEGER;
 begin
  if menuChoice <> 0 then
   begin
    theMenu := HiWord(menuChoice);
    theItem := LoWord(menuChoice);
    case theMenu of
     APPLE_MENU_ID: 
      HandleAppleChoice(theItem);
     FILE_MENU_ID: 
      HandleFileChoice(theItem);
     VIEW_MENU_ID: 
      HandleViewChoice(theItem);
    end;
    HiliteMenu(0);
   end;
 end;

{>>}
 procedure HandleMouseDown;
  var
   whichWindow: WindowPtr;
   thePart: INTEGER;
   menuChoice, windSize: LONGINT;
 begin
  thePart := FindWindow(gTheEvent.where, whichWindow);
  case thePart of
   inMenuBar: 
    begin
     menuChoice := MenuSelect(gTheEvent.where);
     HandleMenuChoice(menuChoice);
    end;
   inSysWindow: 
    SystemClick(gTheEvent, whichWindow);
   inDrag: 
    DragWindow(whichWindow, gTheEvent.where, screenBits.bounds);
   inGoAway: 
    gDone := TRUE;
  end;
 end;

{>>}
 procedure HandleNull;
 begin
  GetDateTime(gCurrentTime);
  if gCurrentTime <> gOldTime then
   UpdateNeedles;
 end;

{>>}
 procedure HandleEvent;
  var
   theChar: CHAR;
   dummy: BOOLEAN;
 begin
  if gWNEimplemented then
   dummy := WaitNextEvent(everyEvent, gTheEvent, SLEEP, nil)
  else
   begin
    SystemTask;
    dummy := GetNextEvent(everyEvent, gTheEvent);
   end;
  case gTheEvent.what of
   nullEvent: 
    HandleNull;
   mouseDown: 
    HandleMouseDown;
   keyDown, autoKey: 
    begin
     theChar := CHR(BitAnd(gTheEvent.message, charCodeMask));
     if (BitAnd(gTheEvent.modifiers, cmdKey) <> 0) then
      HandleMenuChoice(MenuKey(theChar));
    end;
   updateEvt: 
    begin
     BeginUpdate(WindowPtr(gTheEvent.message));
     EndUpdate(WindowPtr(gTheEvent.message));
    end;
  end;
 end;

{>>}
 procedure MainLoop;
 begin
  gDone := FALSE;
  gWNEimplemented := (NGetTrapAddress(WNE_TRAP_NUM, ToolTrap) <> NGetTrapAddress(UNIMPL_TRAP_NUM, ToolTrap));
  while (gDone = FALSE) do
   HandleEvent;
 end;

{>>}
 procedure MenuBarInit;
  var
   myMenuBar: Handle;
   aMenu: MenuHandle;
 begin
  myMenuBar := GetNewMBar(BASE_RES_ID);
  SetMenuBar(myMenuBar);
  DisposHandle(myMenuBar);
  aMenu := GetMHandle(APPLE_MENU_ID);
  AddResMenu(aMenu, 'DRVR');
  DrawMenuBar;
 end;

{>>}
 procedure Windowinit;
 begin
  SetRect(r, 150, 125, 450, 350);
  gClockWindow := NewWindow(nil, r, 'Neralie', true, noGrowDocProc, WindowPtr(-1), true, 0);
  SetPort(gClockWindow);
  ShowWindow(gClockWindow);

  SetDrawingRect(r);
  SetRect(display, 0, 0, r.right - r.left, r.bottom - r.top);
  SetRect(bounds, PAD, PAD, display.right - PAD, display.bottom - PAD);
  SetRect(inbounds, bounds.left + 1, bounds.top + 1, bounds.right - 1, bounds.bottom - 1);
 end;

begin

 WindowInit;
 MenuBarInit;

 UpdateFrame;
 UpdateNeedles;
 MainLoop;

end.

{ Resources needed: }
{ 1x WIND #400 }
{ 1x MBAR #400 4 options}
{ 1x MENU #400 -> Apple#400[about] File#401[quit] Edit#402[undo, cut, copy, paste, clear] View#403[invert, expand] }
{ 1x ALRT #400 }
{ 1x DITL #400 }