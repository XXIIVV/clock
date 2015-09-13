//
//  AppDelegate.swift
//  monitor
//
//  Created by Devine Lu Linvega on 2015-09-12.
//  Copyright (c) 2015 Devine Lu Linvega. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate
{
	@IBOutlet var statusMenu:NSMenu?
	@IBOutlet weak var menu:NSMenu!
	
	@IBOutlet weak var lastUpdateLabel: NSMenuItem!
	
	@IBOutlet weak var osceanTotal: NSMenuItem!
	@IBOutlet weak var osceanLast: NSMenuItem!
	@IBOutlet weak var osceanTime: NSMenuItem!
	
	@IBOutlet weak var paradiseTotal: NSMenuItem!
	@IBOutlet weak var paradiseLast: NSMenuItem!
	@IBOutlet weak var paradiseTime: NSMenuItem!
	
	var statusBarItem:NSStatusItem?
	var secondsSinceUpdate:Int = 0
	
	override func awakeFromNib()
	{
		let statusBar = NSStatusBar.systemStatusBar()
		statusBarItem = statusBar.statusItemWithLength(50)
		statusBarItem!.menu = statusMenu
		
		let image = NSImage(named: "icon.passive.png")
		image?.size = NSSize(width: 18, height: 18)
		statusBarItem?.image = image
		
		update()
		
		NSTimer.scheduledTimerWithTimeInterval(1, target: self, selector: "timeStep", userInfo: nil, repeats: true)
	}
	
	func timeStep()
	{
		secondsSinceUpdate += 1
		
		if secondsSinceUpdate % 10 == 0 {
			secondsSinceUpdate = 0
			update()
		}
		lastUpdateLabel.title = "Updated \(secondsSinceUpdate) sec ago"
	}
	
	func update()
	{		
		let request = NSMutableURLRequest(URL: NSURL(string: "http://api.xxiivv.com/generic/monitor")!)
		let session = NSURLSession.sharedSession()
		
		let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in

			let result:String = NSString(data: data!, encoding: NSUTF8StringEncoding)! as String
			let lines = result.componentsSeparatedByString("\n")
			
			var content = ["root": "new"]
			
			for stringTest in lines
			{
				let keyValue = stringTest.componentsSeparatedByString(":")
				if keyValue.count < 2 { continue }
				let key:String = "\(keyValue[0])"
				let val:String = "\(keyValue[1])"
				content[key] = val
			}
			
			let osceanTime = Int(NSDate().timeIntervalSince1970) - Int(content["oscean-time"]!)!
			var osceanTimeString = "\(osceanTime) seconds ago"
			if osceanTime > 60 { osceanTimeString = "\(osceanTime/60) minutes ago" }
			
			self.osceanTotal.title = "Total Visitors, " + content["oscean-total"]! + " today"
			self.osceanLast.title = "Last page, \"" + content["oscean-last"]! + "\""
			self.osceanTime.title = "Last visit, " + osceanTimeString
			
			let paradiseTime = Int(NSDate().timeIntervalSince1970) - Int(content["paradise-time"]!)!
			var paradiseTimeString = "\(paradiseTime) seconds ago"
			if paradiseTime > 60 { paradiseTimeString = "\(paradiseTime/60) minutes ago" }
			
			self.paradiseTotal.title = "Total Visitors, " + content["paradise-total"]! + " today"
			self.paradiseLast.title = "Last creation, \"" + content["paradise-last"]! + "\""
			self.paradiseTime.title = "Last visit, " + paradiseTimeString
			
			self.statusBarItem!.title = content["total"]!
		})
		task!.resume()
	}

	@IBAction func optionOscean(sender: AnyObject)
	{
		NSWorkspace.sharedWorkspace().openURL(NSURL(string: "http://wiki.xxiivv.com")!)
	}
	
	@IBAction func optionParadise(sender: AnyObject)
	{
		NSWorkspace.sharedWorkspace().openURL(NSURL(string: "http://wiki.xxiivv.com")!)
	}
	
	func applicationDidFinishLaunching(aNotification: NSNotification)
	{
		// Insert code here to initialize your application
	}

	func applicationWillTerminate(aNotification: NSNotification)
	{
		// Insert code here to tear down your application
	}
}

