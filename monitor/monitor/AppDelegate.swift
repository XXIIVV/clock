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
	
	override func awakeFromNib() {
		let statusBar = NSStatusBar.systemStatusBar()
		statusBarItem = statusBar.statusItemWithLength(50)
		statusBarItem!.menu = statusMenu
		statusBarItem!.title = "2.9k"
		
		let image = NSImage(named: "icon.png")
		image?.size = NSSize(width: 18, height: 18)
		statusBarItem?.image = image
		
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

