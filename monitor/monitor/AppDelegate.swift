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
		statusBarItem!.title = "2.9k"
		
		let request = NSMutableURLRequest(URL: NSURL(string: "http://api.xxiivv.com/generic/monitor")!) // Here, kLogin contains the Login API.
		
		let session = NSURLSession.sharedSession()
		
		request.HTTPMethod = "POST"
		
		
		let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
			let strData = NSString(data: data!, encoding: NSUTF8StringEncoding)
			print(strData)
//			var json2 = NSJSONSerialization.JSONObjectWithData(strData!.dataUsingEncoding(NSUTF8StringEncoding), options: .MutableLeaves, error:&err1 ) as NSDictionary
			
//			println("json2 :\(json2)")
			
//			if(err) {
//				println(err!.localizedDescription)
//			}
//			else {
//				var success = json2["success"] as? Int
//				println("Success: \(success)")
//			}
		})
		
		task!.resume()
	}
	
	@IBAction func optionOscean(sender: AnyObject)
	{
		
	}
	
	@IBAction func optionQuit(sender: AnyObject)
	{
		
	}
	
	@IBAction func optionParadise(sender: AnyObject)
	{
		
	}
	
	@IBAction func optionOsceanLast(sender: AnyObject)
	{
		
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

