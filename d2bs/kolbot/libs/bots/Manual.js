/**
*	@filename	Manual.js
*	@author		laz
*	@desc		manual play script with some extra tools
*	@credits 	dzik for his hookHandler, securitycat, kolton libs
*/

function Manual () {
	var	activeAction, end, block, wp, resfix, lifehook, watch, shift, alt,
		i, unit, title, dummy, keydown, currentlife, currentmana,
		classes = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"],
		flags = [0x1, 0x2, 0x3, 0x4, 0x5, 0xf, 0x18, 0x19, 0xc, 0x9],		
		resolution = me.screensize,
		info = new UnitInfo(),		
		channel = "#d2bs", //Default
		hide = false,
		list = true,
		chat = 0,
		hooks = [],
		decor = [],
		box = [],
		life = [],
		mana = [],
		watchSent = [],
		watchRecv = [],
		blockSent = [],
		blockRecv = [];
		
	var keyDown = function (key) {
		switch (key) {
			case 16:
				shift = true;
				break;
			case 18:
				alt = true;
				break;
		}
	}
	
	var keyUp = function (key) {
		switch (key) {
			case 16:
				shift = false;
				break;
			case 18:
				alt = false;
				info.remove();
				break;
		}
	}
	
	var pad = function(str) {
		var p = "00";
		return p.substring(0, p.length - str.length) + str;
	};	
	
	// Received packet handler
	var PacketReceived = function(pBytes) {
		let ID = pad(pBytes[0].toString(16));		
		
		if (blockRecv.indexOf(ID) > -1) { //Block received packets from list
			return true;
		}
		
		if (watchRecv.indexOf(ID) > -1) {	
			let size = pBytes.length;
			let array = [].slice.call(pBytes);
			array.shift();
			print("ÿc2S  ÿc8" + ID + "ÿc0 " + array.map(d => pad(d.toString(16))).join(" ") + "  ÿc5(" + size + " Bytes)");
		}		
		
		return false;
	};
	
	// Sent packet handler
	var PacketSent = function(pBytes) {
		let ID = pad(pBytes[0].toString(16));
		
		if (pBytes[0] === 0x15) { //Block all commands or irc chat from being sent to server
			if (pBytes[3] == 46 || chat == 1) {		
				let str = "";
				
				for (let b = 3; b < pBytes.length - 3; b++) {
					str += String.fromCharCode(pBytes[b]);
				}
				
				if (pBytes[3] == 46) {
					runCommand(str);
					return true;
				}
				
				if (chat == 1 && str[0] !== "/") {
					print("ÿc4" + me.name + "ÿc0: " + str);
					D2Bot.postToIRC("IRC", channel, str);
					return true;
				}
			}
		}		
		
		if (blockSent.indexOf(ID) > -1) { //Block sent packets from list
			return true;
		}
		
		if (watchSent.indexOf(ID) > -1) {
			let size = pBytes.length;
			let array = [].slice.call(pBytes);
			array.shift();
			print("ÿc2C  ÿc8" + ID + "ÿc0 " + array.map(d => pad(d.toString(16))).join(" ") + "  ÿc5(" + size + " Bytes)");			
		}
		
		return false;
	};

	// IRC > ingame chat
	var ircHandler = function(mode, msg) {
		if (mode == 0x411) {
			let message = JSON.parse(msg);
			print("ÿc4" + message.Nick + "ÿc0: " + message.Message);
		}
	};
	
	//Run commands from chat
	function runCommand(msg) {
		if (msg.length <= 1) return true;
		
		let cmd = msg.split(" ")[0].split(".")[1];
		let msgList = msg.split(" ");
		
		switch (cmd.toLowerCase()) {
			case "send":
			case "recv":
				if (msgList.length < 2) {
					print("ÿc1Missing arguments");
					break;
				}
				
				let args = [];
				msgList.shift();
				
				for (let b = 0; b < msgList.length; b++) {
					args[b*2] = 1;
					args[b*2+1] = parseInt(msgList[b]);
				}
				
				args[1] = parseInt("0x" + msgList[0], 16);
				
				if (cmd.toLowerCase() == "send") {
					eval("sendPacket(" + args.join(", ") + ")");
				} else {
					eval("getPacket(" + args.join(", ") + ")");
				}
				
				break;
			
			case "watch":
				if (msgList.length < 3) {
					print("ÿc1Missing arguments");
					break;
				}
				
				switch (msgList[1].toLowerCase()) {
					case "sent":
						if (msgList[2] == "list") {
							print("Watching sent packets : ÿc8" + watchSent.join(", "));
							break;
						}
						
						watchSent.push(msgList[2]);
						print("Added ÿc80x" + msgList[2] + "ÿc0 (sent) to watch list");
						break;
						
					case "recv":
						if (msgList[2] == "list") {
							print("Watching received packets : ÿc8" + watchRecv.join(", "));
							break;
						}
						
						watchRecv.push(msgList[2]);
						print("Added ÿc80x" + msgList[2] + "ÿc0 (recv) to watch list");
						break;
						
					default:
						print("ÿc1Invalid argument : " + msgList[1]);
						break;
				}
				
				break;
				
			case "!watch":
				if (msgList.length < 3) {
					print("ÿc1Missing arguments");
					break;
				}
				
				switch (msgList[1].toLowerCase()) {
					case "sent":
						if (watchSent.indexOf(msgList[2]) > -1) watchSent.splice(watchSent.indexOf(msgList[2]), 1);
						print("Removed packet ÿc80x" + msgList[2] + "ÿc0 (sent) from watch list");
						break;
						
					case "recv":
						if (watchRecv.indexOf(msgList[2]) > -1) watchRecv.splice(watchRecv.indexOf(msgList[2]), 1);
						print("Removed packet ÿc80x" + msgList[2] + "ÿc0 (recv) from watch list");
						break;
						
					default:
						print("ÿc1Invalid argument : " + msgList[1]);
						break;	
				}
				
				break;
				
			case "block":
				if (msgList.length < 3) {
					print("ÿc1Missing arguments");
					break;
				}
				
				switch (msgList[1].toLowerCase()) {
					case "sent":
						if (msgList[2] == "list") {
							print("Blocking sent packets : ÿc8" + blockSent.join(", "));
							break;
						}
						
						blockSent.push(msgList[2]);
						print("Added ÿc80x" + msgList[2] + "ÿc0 (sent) to block list");
						break;
						
					case "recv":
						if (msgList[2] == "list") {
							print("Blocking received packets : ÿc8" + blockRecv.join(", "));
							break;
						}
						
						blockRecv.push(msgList[2]);
						print("Added ÿc80x" + msgList[2] + "ÿc0 (recv) to block list");
						break;
						
					default:
						print("ÿc1Invalid argument : " + msgList[1]);
						break;
				}
				
				break;
				
			case "!block":
				if (msgList.length < 3) {
					print("ÿc1Missing arguments");
					break;
				}
				
				switch (msgList[1].toLowerCase()) {
					case "sent":
						if (blockSent.indexOf(msgList[2]) > -1) blockSent.splice(blockSent.indexOf(msgList[2]), 1);
						print("Removed packet ÿc80x" + msgList[2] + "ÿc0 (sent) from block list");
						break;
						
					case "recv":
						if (blockRecv.indexOf(msgList[2]) > -1) blockRecv.splice(blockRecv.indexOf(msgList[2]), 1);
						print("Removed packet ÿc80x" + msgList[2] + "ÿc0 (recv) from block list");
						break;
						
					default:
						print("ÿc1Invalid argument : " + msgList[1]);
						break;	
				}
				
				break;
				
			case "reload":
				reload();
				break;
			
			case "chat":
				if (msgList.length < 2) {
					print("ÿc1Missing arguments");
					break;
				}
				
				switch (msgList[1].toLowerCase()) {
					case "game":
					case "0":
						print("Chat mode set to : ÿc8in-game");
						chat = 0;
						break;
					
					case "irc":
					case "1":
						print("Chat mode set to : ÿc8irc");
						chat = 1;
						break;
					
					default:
						print("ÿc1Invalid chat mode : " + msgList[1]);
						break;
				}
				
				break;
				
			case "msg":
				if (msgList.length < 3) {
					print("ÿc1Missing arguments");
					break;
				}
				
				D2Bot.postToIRC("IRC", msgList[1], msg.split(".msg " + msgList[1] + " ")[1]);
				print("ÿc2to " + msgList[1] + "ÿc0: " + msg.split(".msg " + msgList[1] + " ")[1]);
				break;
				
			case "channel":
				if (msgList.length < 2) {
					print("ÿc1Missing arguments");
					break;
				}
				
				if (msgList[1][0] !== "#") {
					print("ÿc1Invalid channel : " + msgList[1]);
					break;
				}
				
				channel = msgList[1];
				print("Set channel to : ÿc8" + msgList[1]);
				break;				
			
			case "commands":
			case "help":
				print("Help -------------------------------------------------------------");
				
				print(".watch sent id      ÿc5Adds a sent packet to watch list");
				print(".watch recv id      ÿc5Adds a received packet to watch list");
				
				print(".!watch sent id     ÿc5Removes a sent packet from watch list");
				print(".!watch recv id     ÿc5Removes a received packet from watch list");
				
				print(".watch sent list    ÿc5Lists all packets from sent watch list");
				print(".watch recv list    ÿc5Lists all packets from received watch list");
				
				print(".block sent id       ÿc5Adds a sent packet to block list");
				print(".block recv id       ÿc5Adds a received packet to block list");
				
				print(".!block sent id      ÿc5Removes a sent packet from block list");
				print(".!block recv id      ÿc5Removes a received packet from block list");
				
				print(".block sent list     ÿc5Lists all packets from sent block list");
				print(".block recv list     ÿc5Lists all packets from received block list");
				
				print(".send id bytes       ÿc5Sends a packet, example .send 13 2 0 0 0 17 0 0 0");
				print(".recv id bytes       ÿc5Receive a packet, example .recv 77 16");
				
				print(".chat mode          ÿc5Sets chat mode. 0 = game, 1 = irc");
				print(".channel #name   ÿc5Sets irc channel name. Default = #d2bs");
				print(".msg nick msg      ÿc5Whisper a specific user on irc");
				print(".reload                 ÿc5Reloads in-game script");
				
				//print("--------------------------------------------------------------------")
				break;
			
			default:
				print("ÿc1Invalid command : " + cmd);
				break;
		}
		
		return true;
	}
	
	function UpdateLife() {
		if (!box.length) { // Add boxes and frames for life and mana
			box.push(new Box (71, 541, 34, 16, 0, 100, 2));
			box.push(new Box (732, 541, 34, 16, 0, 100, 2));
			box.push(new Frame (70, 541, 34, 16, 2));
			box.push(new Frame (731, 541, 34, 16, 2));
			box[0].zorder = 0;
			box[1].zorder = 0;
		}
		
		currentlife = (Math.round((me.hp * 100) / me.hpmax)).toString();
		currentmana = (Math.round((me.mp * 100) / me.mpmax)).toString();
		
		if (!life.length) {
			life.push(new Text(currentlife, 71, 555, 0, 1, 2));
		}
		
		if (life[0].text !== currentlife) {
			life[0].remove();
			life.shift();
			life.push(new Text(currentlife, 71, 555, 0, 1, 2));
		}
		
		if (!mana.length) {
			mana.push(new Text(currentmana, 732, 555, 0, 1, 2));
		}
		
		if (mana[0].text !== currentmana) {
			mana[0].remove();
			mana.shift();
			mana.push(new Text(currentmana, 732, 555, 0, 1, 2));
		}
	}
	
	function UnitInfo() {
		this.x = 684;
		this.y = 157;
		this.hooks = [];
		this.cleared = true;
	
		this.createInfo = function (unit) {
			if (typeof unit === "undefined") {
				this.remove();

				return;
			}

			switch (unit.type) {
			case 0:
				this.playerInfo(unit);

				break;
			case 1:
				this.monsterInfo(unit);

				break;
			case 4:
				this.itemInfo(unit);

				break;
			}
		};

		this.playerInfo = function (unit) {
			var i, items, string,
				frameXsize = 20,
				frameYsize = 20,
				quality = ["ÿc0", "ÿc0", "ÿc0", "ÿc0", "ÿc3", "ÿc2", "ÿc9", "ÿc4", "ÿc8"];

			if (!this.currentGid) {
				this.currentGid = unit.gid;
			}

			if (this.currentGid === unit.gid && !this.cleared) {
				return;
			}

			if (this.currentGid !== unit.gid) {
				this.remove();
				this.currentGid = unit.gid;
			}

			this.hooks.push(new Text("ÿc0" + unit.name + " (" + unit.charlvl + " " + classes[unit.classid] + ")", this.x, this.y, 4, 13, 2));

			items = unit.getItems();

			if (items) {
				this.hooks.push(new Text("Equipped items:", this.x, this.y + 15, 4, 13, 2));
				frameYsize += 15;

				for (i = 0; i < items.length; i += 1) {
					if (items[i].getFlag(0x4000000)) {
						string = items[i].fname.split("\n")[1] + "ÿc0 " + items[i].fname.split("\n")[0];
					} else {
						string = quality[items[i].quality] + (items[i].quality > 4 && items[i].getFlag(0x10) ? items[i].fname.split("\n").reverse()[0].replace("ÿc4", "") : items[i].name);
					}

					this.hooks.push(new Text(string, this.x, this.y + (i + 2) * 15, 0, 13, 2));

					if (string.length > frameXsize) {
						frameXsize = string.length;
					}

					frameYsize += 15;
				}
			}
			
			frameXsize = 30;	// always same size, delete if needed
				
			frameYsize += 145;
				
			this.hooks.push(new Text("Fire Resist: ÿc1" + (unit.getStat(39) - 30) + " / " + (unit.getStat(40) + 75), this.x, this.y + (i + 2) * 15 + 10, 4, 13, 2));
			this.hooks.push(new Text("Cold Resist: ÿc3" + (unit.getStat(43) - 30) + " / " + (unit.getStat(44) + 75), this.x, this.y + (i + 2) * 15 + 25, 4, 13, 2));
			this.hooks.push(new Text("Light Resist: ÿc9" + (unit.getStat(41) - 30) + " / " + (unit.getStat(42) + 75), this.x, this.y + (i + 2) * 15 + 40, 4, 13, 2));
			this.hooks.push(new Text("Poison Resist: ÿc2" + (unit.getStat(45) - 30) + " / " + (unit.getStat(46) + 75), this.x, this.y + (i + 2) * 15 + 55, 4, 13, 2));
			this.hooks.push(new Text("Physical resist: ÿc0" + unit.getStat(36), this.x, this.y + (i + 2) * 15 + 70, 4, 13, 2));

			//Sorb
			this.hooks.push(new Text("Fire Absorb: ÿc1" + unit.getStat(142), this.x, this.y + (i + 2) * 15 + 85, 4, 13, 2));
			this.hooks.push(new Text("Cold Absorb: ÿc3" + unit.getStat(148), this.x, this.y + (i + 2) * 15 + 100, 4, 13, 2));
			this.hooks.push(new Text("Light Absorb: ÿc9" + unit.getStat(144), this.x, this.y + (i + 2) * 15 + 115, 4, 13, 2));
			
			this.hooks.push(new Text("Faster Cast Rate: ÿc0" + unit.getStat(105), this.x, this.y + (i + 2) * 15 + 130, 4, 13, 2));
				
			this.cleared = false;

			this.hooks.push(new Box(this.x + 2, this.y - 15, Math.round(frameXsize * 7.5) - 4, frameYsize, 0x0, 1, 2));
			this.hooks.push(new Frame(this.x, this.y - 15, Math.round(frameXsize * 7.5), frameYsize, 2));

			this.hooks[this.hooks.length - 2].zorder = 0;
		};

		this.monsterInfo = function (unit) {
			var frameYsize = 125;

			if (!this.currentGid) {
				this.currentGid = unit.gid;
			}

			if (this.currentGid === unit.gid && !this.cleared) {
				return;
			}

			if (this.currentGid !== unit.gid) {
				this.remove();
				this.currentGid = unit.gid;
			}

			this.hooks.push(new Text("Classid: ÿc0" + unit.classid, this.x, this.y, 4, 13, 2));
			this.hooks.push(new Text("HP percent: ÿc0" + Math.round(unit.hp * 100 / 128), this.x, this.y + 15, 4, 13, 2));
			this.hooks.push(new Text("Fire resist: ÿc1" + unit.getStat(39), this.x, this.y + 30, 4, 13, 2));
			this.hooks.push(new Text("Cold resist: ÿc3" + unit.getStat(43), this.x, this.y + 45, 4, 13, 2));
			this.hooks.push(new Text("Lightning resist: ÿc9" + unit.getStat(41), this.x, this.y + 60, 4, 13, 2));
			this.hooks.push(new Text("Poison resist: ÿc2" + unit.getStat(45), this.x, this.y + 75, 4, 13, 2));
			this.hooks.push(new Text("Physical resist: ÿc0" + unit.getStat(36), this.x, this.y + 90, 4, 13, 2));
			this.hooks.push(new Text("Magic resist: ÿc0" + unit.getStat(37), this.x, this.y + 105, 4, 13, 2));

			this.cleared = false;
			
			this.hooks.push(new Box(this.x + 2, this.y - 15, 136 + 85, frameYsize, 0x0, 1, 2));
			this.hooks.push(new Frame(this.x, this.y - 15, 140 + 85, frameYsize, 2));

			this.hooks[this.hooks.length - 2].zorder = 0;
		};

		this.itemInfo = function (unit) {
			var i = 0,
				frameYsize = 50;

			if (!this.currentGid) {
				this.currentGid = unit.gid;
			}

			if (this.currentGid === unit.gid && !this.cleared) {
				return;
			}

			if (this.currentGid !== unit.gid) {
				this.remove();
				this.currentGid = unit.gid;
			}

			this.hooks.push(new Text("Classid: ÿc0" + unit.classid, this.x, this.y, 4, 13, 2));
			this.hooks.push(new Text("Code: ÿc0" + unit.code, this.x, this.y + 15, 4, 13, 2));
			this.hooks.push(new Text("Item level: ÿc0" + unit.ilvl, this.x, this.y + 30, 4, 13, 2));

			this.cleared = false;
			this.socketedItems = unit.getItems();

			if (this.socketedItems[0]) {
				this.hooks.push(new Text("Socketed with:", this.x, this.y + 45, 4, 13, 2));
				frameYsize += 15;

				for (i = 0; i < this.socketedItems.length; i += 1) {
					this.hooks.push(new Text(this.socketedItems[i].fname.split("\n").reverse().join(" "), this.x, this.y + (i + 4) * 15, 0, 13, 2));

					frameYsize += 15;
				}
			}
			
			// Get prefix and suffix from identified magic items
			if (unit.quality === 4 && unit.getFlag(0x10)) {
				this.hooks.push(new Text("Prefix: ÿc0" + unit.prefixnum, this.x, this.y + frameYsize - 5, 4, 13, 2));
				this.hooks.push(new Text("Suffix: ÿc0" + unit.suffixnum, this.x, this.y + frameYsize + 10, 4, 13, 2));

				frameYsize += 30;
			}
			
			// Get prefixes and suffixes from rare items
			if (unit.quality === 6) {
				var prefixes = unit.prefixes;
				var n = 0;
				while (n < prefixes.length) {
					this.hooks.push(new Text("Prefix: ÿc0" + prefixes[n], this.x, this.y + frameYsize - 5, 4, 13, 2));
					frameYsize += 15;
					n += 1
				}
				
				var suffixes = unit.suffixes;
				var n = 0;
				while (n < suffixes.length) {
					this.hooks.push(new Text("Suffix: ÿc0" + suffixes[n], this.x, this.y + frameYsize - 5, 4, 13, 2));
					frameYsize += 15;
					n += 1
				}
				//this.hooks.push(new Text("Suffix: ÿc0" + unit.suffixes, this.x, this.y + frameYsize + 10, 4, 13, 2));
			}

			this.hooks.push(new Box(this.x + 2, this.y - 15, 116 + 105, frameYsize, 0x0, 1, 2));
			this.hooks.push(new Frame(this.x, this.y - 15, 120 + 105, frameYsize, 2));

			this.hooks[this.hooks.length - 2].zorder = 0;
		};

		this.remove = function () {
			while (this.hooks.length > 0) {
				this.hooks.shift().remove();
			}

			this.cleared = true;
		};
	}
	
	function sortPickList(a, b) {
		if (b.sizex === a.sizex && b.sizey === a.sizey) {
			return getDistance(me, a) - getDistance(me, b);
			   
		}
		return b.sizex * b.sizey - a.sizex * a.sizey;
	}

	function sortMoveList(a, b) {          
		return b.sizex * b.sizey - a.sizex * a.sizey;         
	}
	
	function hookHandler (click, x, y) {
		function sortHooks(h1, h2) {
			return Math.abs(h1.y - y) - Math.abs(h2.y - y);  
		}
		if (click === 0) {
			hooks.sort(sortHooks);
			if (activeAction && activeAction !== hooks[0].text) return true;
			activeAction = activeAction ? false : hooks[0].text;
			hooks[0].color = hooks[0].color === 4 ? 1 : 4;
			return true;	   
		}
		return false; 
	}
   
	function showHooks () {
		resfix = me.screensize ? 0 : -120;
		if (hooks.length) {
			if (resolution != me.screensize || hide) {
				resolution = me.screensize;
				while (hooks.length) {
					var kill = hooks.shift();
					kill.remove();
				}
				while (decor.length) {
					var kill = decor.shift();
					kill.remove();
				}
				list = !list;
			} else {
				return false;
			}
		}
	   
		if (list) {
			var commands = [
				"Show",
			];
		} 
		
		else {
			var commands = [
				"test",
				"Toggle grid",
				"Toggle info",
				"Sell sojs",
				"Drop from inventory", 
				"Drop from stash",
				//"Drop from cube",
				"Drop gold",
				"Pick to inventory",
				//"Move inv to trade", 
				"Move inv to stash",
				"Log char",
				"End",
				"Hide",
			];
		}
	   
		for (var i = commands.length; i; i--) {
			addHook (commands[i-1]);  
		}
	   
		hide = false;
	   
		return true;
		   
	}
	
	function addHook (text) {
		//decor.push (new Frame (6, 466 - hooks.length * 19 + resfix + 7, 160, 16));
		
		if (text === "Show" || text === "Hide") {
			hooks.push (new Text (text, 5, 480 - hooks.length * 16 + resfix + 116, 2, 1, 0, false, hookHandler));
			decor.push (new Box (1, 466 - hooks.length * 16 + resfix + 116, 50, 16));
		} else {
			hooks.push (new Text (text, 9, 480 - hooks.length * 16 + resfix + 23, 4, 1, 0, false, hookHandler));
		}
	}
	
	addEventListener("keydown", keyDown);
	addEventListener("keyup", keyUp);
	addEventListener("gamepacketsent", PacketSent);
	addEventListener("gamepacket", PacketReceived);	
	//addEventListener("copydata", ircHandler);
	load("tools/mapthread.js");
	//D2Bot.ircEvent(true);
	
	var showGrid = false;
	var gridLines = [];
	var gridColor = 0;
	
	while (true) {
		
		if (keydown || alt) {
			unit = getUnit(101);
			info.createInfo(unit);
			delay(20);
		}
		
		if (shift && getUnit(100)) {
			if (getUIFlag(0x19)) {
				if (Storage.Stash.CanFit(getUnit(100))) {
					Storage.Stash.MoveTo(getUnit(100));					
				}				
			}
		}
		
		UpdateLife();
		if (end) break;
		
		switch (activeAction) {
			case "test":
				activeAction = false;
				break;
				
			case "Toggle grid":
				if (showGrid) {
					showGrid = false;
					while (gridLines.length) gridLines.shift().remove();
					activeAction = false;
					break;					
				}
				
				showGrid = true;
				
				var gridSize  = 84; //20x20 units
				var cellSize  = 89.443 / 5; //Hypotenuse
				var angle 	  = 26.565; //30 degree angle
				gridColor += 1;
				//print(gridColor);
				
				var cellW = Math.cos(angle * (Math.PI / 180)) * cellSize;
				var cellH = Math.sin(angle * (Math.PI / 180)) * cellSize;
				
				//print(Pather.getNearestWalkable(me.x, me.y, 1, 1, 0x1, 1))
				
				gridColor = 5;
				for (var i = 0; i < gridSize; i++) {
					if (i % 5 == 0) continue;
					
					gridLines.push(new Line(
						Math.round((800/2) - (i * cellW)),
						Math.round((600/2) + (gridSize * cellH) - (i * cellH)),
						Math.round((800/2) + (gridSize * cellW) - (i * cellW)), //+ == right
						Math.round((600/2) - (i * cellH)), //+ == down
						gridColor,
						false
					));
					
					gridLines.push(new Line(
						Math.round((800/2) - ((gridSize * cellW)) + (i * cellW)),
						Math.round((600/2) - (i * cellH)),
						Math.round((800/2) + (i * cellW)),
						Math.round((600/2) + (gridSize * cellH) - (i * cellH)),
						gridColor,
						false
					));
				}
				
				gridColor = 8;
				for (var i = 0; i < gridSize; i++) {
					if (i % 5 !== 0) continue;
					
					gridLines.push(new Line(
						Math.round((800/2) - (i * cellW)),
						Math.round((600/2) + (gridSize * cellH) - (i * cellH)),
						Math.round((800/2) + (gridSize * cellW) - (i * cellW)), //+ == right
						Math.round((600/2) - (i * cellH)), //+ == down
						gridColor,
						false
					));
					
					gridLines.push(new Line(
						Math.round((800/2) - ((gridSize * cellW)) + (i * cellW)),
						Math.round((600/2) - (i * cellH)),
						Math.round((800/2) + (i * cellW)),
						Math.round((600/2) + (gridSize * cellH) - (i * cellH)),
						gridColor,
						false
					));
				}				
				
				for (i = 0; i < gridLines.length; i++) gridLines[i].zorder = 0;
				
				gridLines.push(new Line(Math.round(800/2)+1, 	Math.round(600/2), 					Math.round((800/2) + cellW)+2, 	Math.round((600/2) - cellH)-1, 132, false)); //388 //132
				gridLines.push(new Line(Math.round(800/2)+2, 	Math.round(600/2), 					Math.round((800/2) - cellW)+1, 	Math.round((600/2) - cellH)-1, 132, false)); //388 //132
				gridLines.push(new Line(Math.round(800/2)+1, 	Math.round((600/2) - (2*cellH)), 	Math.round((800/2) + cellW)+2, 	Math.round((600/2) - cellH)+1, 132, false)); //388 //132
				gridLines.push(new Line(Math.round(800/2)+2, 	Math.round((600/2) - (2*cellH)), 	Math.round((800/2) - cellW)+1, 	Math.round((600/2) - cellH)+1, 132, false)); //388 //132
			
				activeAction = false;
				break;				
				
			case "Sell sojs":
				if (!getUIFlag(0x08) || !getInteractedNPC()) {
					print("Shop not open");
					activeAction = false;
					break;
				}
				
				var walked = false;
				
				var gameEvent = function (mode, param1, param2, name1, name2) {
					if (mode === 0x12) {
						walked = true;
					}
				}
				
				addEventListener("gameevent", gameEvent);
			
				var inv = me.findItems(-1, -1, 3);
				
				for (var i = 0; i < inv.length; i++) {
					if (inv[i].fname === "Ring\nThe Stone of Jordan") {
					//if (inv[i].fname === "Key") {
						inv[i].sell();
						delay(me.ping*2 + 500);
						
						if (walked) {
							break;
						}
					}
				}
				
				removeEventListener("gameevent", gameEvent);
				
				activeAction = false;
				break;
			
			case "Toggle info":
				
				if (!keydown) {
					me.overhead("     Unit info ÿc2ON");
					keydown = true;
				} else {
					me.overhead("     Unit info ÿc1OFF");
					keydown = false;
				}
				
				activeAction = false;
				break;
			
			case "Log char":
				include("MuleLogger.js");
				MuleLogger.logChar();

				activeAction = false;
				break;

			case "Drop from inventory":
				
				me.cancel();
				me.cancel();
				var items = me.findItems(-1, 0, 3);

				if (items) {
					while (activeAction && items.length > 0) {
						let item = items.shift();
						item.drop();
					}							   
				}
			   
				me.cancel();

				activeAction = false;
				break;

			case "Drop from stash":
			case "Drop from cube":
				if (!me.inTown || !Town.openStash()) {
					me.overhead("Failed to open stash");

					activeAction = false;
					break;
				}

				items = me.findItems(-1, 0, activeAction === "Drop from stash" ? 7 : 6);

				if (items) {
					while (activeAction && items.length > 0) {
						var item = items.shift();

						if (item.classid !== 549) { // Don't drop the cube
							
							item.drop();
						}
					}
				}

				me.cancel();
	   
				activeAction = false;
				break;
			   
			case "Drop gold":
				if (!me.inTown || !Town.openStash()) {
					me.overhead("Failed to open stash");

					activeAction = false;
					break;
				}

				while (me.gold && activeAction) {
					print(me.gold);
					if (me.getStat (15) > 0 && me.getStat (14) < me.getStat (12) * 10000) {
						let stashg = me.getStat (15) == 0 ? 0 : me.getStat (15);
						let invg = me.getStat (14) == 0 ? 0 : me.getStat (14);
						let missing = me.getStat (12) * 10000 - me.getStat(14);
					   
						let difference = Math.min(stashg, missing);
					   
						gold (difference, 4);
					   
						while (invg === me.getStat(14)) {
							delay (100)
						}
					}
				   
					var invg = me.getStat (14);
				   
					gold (invg);
				   
					while (invg === me.getStat(14)) {
						delay (100)
					}
				}

				me.cancel();
	   
				activeAction = false;
				break;
			   
			case "Pick to inventory":
				item = getUnit(4, -1, 3);
				items = [];
				var cancelFlags = [0x01, 0x02, 0x04, 0x08, 0x14, 0x16, 0x0c, 0x0f, 0x19, 0x1a];
			   
				for (var i = 0; i < cancelFlags.length; i++) {
					if (getUIFlag (cancelFlags[i])) {
						me.cancel();
					}
				}

				if (item) {
					do {
						items.push (copyUnit (item));
					} while (item.getNext ());
				}

				while (activeAction && items.length > 0) {
					items.sort (sortPickList);

					item = items.shift ();

					if (Town.ignoredItemTypes.indexOf (item.itemType) === -1 && Storage.Inventory.CanFit (item)) {
						Pickit.pickItem (item);
					}
				}                              
	   
				activeAction = false;
				break;
			   
			case "Move inv to trade":
				var inv = me.findItems (-1, 0, 3);
				inv.sort(sortMoveList);
											   
				while (activeAction && inv.length) {
					var that = inv.shift();
				   
					if (getUIFlag(0x17) && Storage.TradeScreen.CanFit(that)) {
						Storage.TradeScreen.MoveTo(that);							   
					}
				}                              
	   
				activeAction = false;
				break;
			   
			case "Move inv to stash":
				var inv = me.findItems (-1, 0, 3);
				inv.sort(sortMoveList);
			   
				while (activeAction && inv.length) {
					var that = inv.shift();
				   
					if (Storage.Stash.CanFit(that)) {
						Storage.Stash.MoveTo(that);							   
					}
				}                              
	   
				activeAction = false;
				break;
				
			case "End":
				end = true;
				
				D2Bot.stop(me.profile);
				activeAction = false;
				break;
			   
			case "Hide":
			case "Show":                           
				hide = true;
			   
				activeAction = false;
				break;
	   
			default:
				showHooks ();
			   
				for (var i = 0; i < hooks.length; i++) {
					if (hooks[i].color === 1) {
						hooks[i].color = 4;
					}
				}
			   
				break;
		}  
		delay (10);
	}
   
	return true;
}