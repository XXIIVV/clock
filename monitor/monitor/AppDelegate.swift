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
	
	@IBOutlet weak var window: NSWindow!
	
	override func awakeFromNib() {
		let statusBar = NSStatusBar.systemStatusBar()
		statusBarItem = statusBar.statusItemWithLength(CGFloat(NSVariableStatusItemLength))
		statusBarItem!.menu = statusMenu
		statusBarItem!.title = "TestApp"
	}

	func applicationDidFinishLaunching(aNotification: NSNotification) {
		// Insert code here to initialize your application
	}

	func applicationWillTerminate(aNotification: NSNotification) {
		// Insert code here to tear down your application
	}
}

