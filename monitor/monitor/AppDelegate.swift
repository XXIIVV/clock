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
	@IBOutlet var statusMenu: NSMenu?
	var statusBarItem : NSStatusItem?
	
	@IBOutlet weak var menu: NSMenu!
	@IBOutlet weak var window: NSWindow!
	
	override func awakeFromNib() {
		let statusBar = NSStatusBar.systemStatusBar()
		statusBarItem = statusBar.statusItemWithLength(50)
		statusBarItem!.menu = statusMenu
		statusBarItem!.title = "2.9k"
		
		let image = NSImage(named: "icon.png")
		image?.size = NSSize(width: 18, height: 18)
		statusBarItem?.image = image

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

