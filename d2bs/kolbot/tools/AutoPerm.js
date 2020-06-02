/**
 *		@filename   AutoPerm.js
 *		@author		laz
 *		@desc       Automated Perming
 */

var defPass 	= "somepass"; 		// Default password to use in case of no match in mulelogger / automule
var enable		= true;			// Enable autoperm for this folder

var exclude = {
	sockets		: false,	// Don't perm socket characters (level < 5 and a5 normal = socket char)
	imbues		: false, 	// Don't perm imbue characters (14 > level > 8 and still in a1 = imbue char)
	level		: 10,		// Don't perm characters with x level and up (mfers etc) 0 to disable
	profiles	: [],		// Don't perm anything sent from these profiles
	realms		: [],		// Don't perm anything from these realms (useast, uswest, europe, asia)
	accounts	: [],		// Don't perm these accounts
	prefixes	: [],		// Don't perm any account with one of these prefixes
};

// No touchy! ---------------------------------------------------------------------------------------------------------

function main() {
	if (!enable || exclude.profiles.indexOf(me.profile) > -1) {
		return true;
	}	
	
	print("AutoPerm loaded");
	
	if (!isIncluded("mulelogger.js")) 	include("mulelogger.js");
	if (!isIncluded("automule.js")) 	include("automule.js");
	
	var character, flags, stats, time, t, b, i,
		buffer = [],
	
	titles = [
		[[["Dame", "Lady", "Baroness"],["Slayer", "Champion", "Matriarch"]],[["Countess", "Duchess", "Queen"],["Destroyer", "Conquerer", "Guardian"]]],	// Amazon
		[[["Dame", "Lady", "Baroness"],["Slayer", "Champion", "Matriarch"]],[["Countess", "Duchess", "Queen"],["Destroyer", "Conquerer", "Guardian"]]],	// Sorceress
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Necromancer
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Paladin
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Barbarian
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Druid
		[[["Dame", "Lady", "Baroness"],["Slayer", "Champion", "Matriarch"]],[["Countess", "Duchess", "Queen"],["Destroyer", "Conquerer", "Guardian"]]]	// Assassin
	];
	
	var getPassword = function(acc) { //ty dzik+adhd
		var i;

		for (i in MuleLogger.LogAccounts) {
			if (MuleLogger.LogAccounts.hasOwnProperty(i) && typeof i === "string") {
				if (i.indexOf("/") > -1) {
					if (i.split("/")[0].toLowerCase() === acc.toLowerCase()) {
						return i.split("/")[1];
					}
					
					continue;
				}
				
				for (var j in MuleLogger.LogAccounts[i]) {
					if (MuleLogger.LogAccounts[i].hasOwnProperty(j) && typeof j === "string") {
						if (j.split("/")[0].toLowerCase() === acc.toLowerCase()) {
							return j.split("/")[1];
						}
					}					
				}
			}
		}
		
		for (i in AutoMule.Mules) {
			if (AutoMule.Mules[i].accountPrefix) {
				if (acc.toLowerCase().match(AutoMule.Mules[i].accountPrefix.toLowerCase())) {
					return AutoMule.Mules[i].accountPassword;
				}
			}
		}
		
		for (i in AutoMule.TorchAnniMules) {
			if (AutoMule.TorchAnniMules[i].accountPrefix) {
				if (acc.toLowerCase().match(AutoMule.TorchAnniMules[i].accountPrefix.toLowerCase())) {
					return AutoMule.TorchAnniMules[i].accountPassword;
				}
			}
		}
		
		return defPass;
	};
	
	var pad = function(str) {
		var p = "00";
		return p.substring(0, p.length - str.length) + str;
	};
	
	var prepare = function (str) {
		return str + String.fromCharCode(3);
	}
	
	addEventListener("realmpacket", function(pBytes) {
		if (pBytes[0] !== 0x19) return false;
		
		buffer.push([].slice.call(pBytes));
		return false;
	});
	
	// Start
	
	while (true) {
		delay(100);
		
		if (!buffer.length) continue;

		let byteArray 	= buffer.shift();
		let hex 		= byteArray.map(d => pad(d.toString(16))).join(" ");
		let numchars 	= parseInt(byteArray[3]);
		let time 		= Math.round(new Date().getTime()/1000);
		let bytes 		= byteArray.slice(9, byteArray.length);
		let account		= {};
		let lastMule	= false;
		
		account.account = me.account;
		account.password = getPassword(account.account);
		account.realm	= me.realm.toLowerCase();
		account.profile = me.profile;
		account.perming = false;
		account.time	= time;
		account.chars	= [];
		
		if (getScript("D2BotMule.dbj")) { // Put account on hold for 24h if we're an automule profile
			account.time += 86400;
		}
		
		for (i = 0; i < numchars; i++) {
			character = {};
			
			t = bytes.slice(0, 4).reverse();
			t = ((t[t.length - 1]) | (t[t.length - 2] << 8) | (t[t.length - 3] << 16) | (t[t.length - 4] << 24) >>> 0);
			t = (t - time) / (60 * 60); // hours
			
			bytes = bytes.slice(4, bytes.length);
			character.charname = "";
			
			while (bytes.length) {
				b = bytes.shift();
				if (b === 0x00) break;
				character.charname += String.fromCharCode(b);
			}
			
			flags 				= bytes[26];
			character.expiry 	= Math.round(t * 100) / 100; //round to 2 decimals
			character.perm 		= character.expiry > ((11 * 24) + 0.1);
			character.refresh 	= character.expiry < (15 * 24);
			character.level		= parseInt(bytes[25]);
			character.type		= parseInt(bytes[13]) - 1;
			character.ladder 	= bytes[30] !== 0xff;
			character.dead 		= (flags & 0x08) !== 0;
			character.hardcore 	= (flags & 0x04) !== 0;
			character.expansion = (flags & 0x20) !== 0;
			character.diff 		= ((bytes[27] & 0x3e) >> 1) / (character.expansion ? 5 : 4);
			character.title		= Math.floor(character.diff) === 0 ? "" : titles[character.type][character.hardcore ? 1 : 0][character.expansion ? 1 : 0][Math.floor(character.diff)-1];
			bytes = bytes.slice(34, bytes.length);
			
			if (exclude.sockets && character.expansion && character.diff === 0.6 && character.level < 5) continue;
			if (exclude.imbues && character.diff === 0 && character.level > 7 && character.level < 15) continue;
			if (exclude.level && character.level > exclude.level) continue;
			
			account.chars.push(character);
			//print(JSON.stringify(character));
		}		
		
		//Exclusions
		if (exclude.profiles.indexOf(account.profile) > -1) account.chars = [];
		if (exclude.accounts.indexOf(account.account) > -1) account.chars = [];
		if (exclude.realms.indexOf(account.realm)     > -1) account.chars = [];
		for (i = 0; i < exclude.prefixes.length; i++) {
			if (account.account.match(exclude.prefixes[i])) {
				account.chars = [];
			}
		}
		
		sendCopyData(null, "AutoPerm", 8787, JSON.stringify(account));
		print("ÿc2AutoPerm ÿc0:: Updated " + account.chars.length + " chars");
		//FileTools.writeText("test.txt", JSON.stringify(account) + "\n");
	}
	
	return true;
}