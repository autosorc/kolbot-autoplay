/**
*	@filename	Hunter.js
*	@author		LAZ
*	@desc		Passive annihilus hunter settings and functions
*/

var Hunter = {
	Hunters: {
		"Hunter1": {															// Hunter profile name CaSe SeNsItIvE
			enabledProfiles:	[],					// List of profiles that will request hunter on Diablo walks the earth
			keyRelease:			false,											// true = stopProfile key will get released on stop
			maxWait:			30,												// Max time to wait for the hunter to join our game (minutes)
			pickit:				"[name] == smallcharm && [quality] == unique",	// Pickit line to use, if stats aren't good enough it will ID it and check again, if it's stil not a match it will be dropped. Set stats to minimum to force identify
			stopProfile:		"",												// Turns off a profile before running hunter, useful if you have few keys or you only have one smiter for torches
			stopCompleted:		false											// Stops the profile of the char that found the clone once the job is done
		}
	},
	
	// No touchy!
	
	profile: false,
	needHelp: false,
	settings: false,
	isHunter: false,
	
	getHunter: function() {
		for (let profile in this.Hunters) {
			if (this.Hunters[profile].enabledProfiles.indexOf(me.profile) > -1 || profile === me.profile) {
				this.settings = this.Hunters[profile];
				this.profile = profile;
				if (profile === me.profile)
					this.isHunter = true;
				return true;
			}
		}
		
		return false;
	},
	
	jobDone: function() {
		if (!this.profile && !this.getHunter()) return false;
			
		for (let i = 0; i < this.Hunters[this.profile].enabledProfiles.length; i++) {
			sendCopyData(null, this.Hunters[this.profile].enabledProfiles[i], 53, me.gamename + "/" + me.realm);
		}
		
		return true;
	},
	
	haveAnni: function() {
		return !!me.findItem(603, 0, -1, 7);
	},
	
	setPickit: function() {
		if (!this.settings) return false;
		
		var pickitFile = {
			line: 1,
			file: "hunter",
			string: this.settings.pickit
		};
		
		var pickitLine = NTIP.ParseLineInt(this.settings.pickit, pickitFile);
		
		NTIP.Clear();
		NTIP_CheckList.push(pickitLine);
		stringArray.push(pickitFile);
		
		return true;
	},
	
	keepAnni: function() {
		var anni = me.findItem(603, 0, -1, 7);
		if (!anni) return false;
		
		var result = NTIP.CheckItem(anni, false, true);
		
		if (result.result === 1 && result.line === "hunter #1") {
			return true;
		}
		
		if (result.result === 0 && !anni.getFlag(0x10)) { // is unid
			var tome = me.findItem(519, 0, 3); //Tome of id
			
			if (tome && tome.getStat(70) < 1) { //Out of id scrolls
				print("Out of ID scrolls!");
				return true; //Keep annis if out of scrolls, no reason to throw it away
			}
			
			Town.identifyItem(anni, tome);
			
			result = NTIP.CheckItem(anni, false, true);
			
			if (result.result === 1 && result.line === "hunter #1") {
				return true;
			}
		}
		
		return false;
	},
	
	init: function() {
		if (!this.getHunter() || this.isHunter) { // Hunter doesn't load the listener
			return true;
		}
		
		function hunterEvent(mode, msg) {
			if (!Hunter.needHelp) 				return true;
			if (!me.ingame || !me.gameReady) 	return true;
			
			switch (mode) {
				case 53:
					if (msg !== me.gamename + "/" + me.realm) {
						break;
					}
					
					if (Hunter.settings.stopCompleted) {
						D2Bot.stop();
						break;
					}
					
					Hunter.needHelp = false;
					scriptBroadcast("quit");
					
					break;
				case 54:
					sendCopyData(null, Hunter.profile, 55, me.profile);
					break;
			}
			
			return true;
		}
		
		removeEventListener("copydata", hunterEvent);
		addEventListener("copydata", hunterEvent);
		print("Hunter loaded");
		return true;
	}
};