/**
 *		@filename   iDB.js
 *		@author		laz & Doug
 *		@desc       iDB Item and character logging for kolbot
 *		@version	1.5
 */

var settings = {
	iDBdatabaseName	: "Default",		// iDB database name to send to
	iDBaddress		: "localhost",		// iDB IP Address to connect to
	iDBport			: 7337,				// iDB Port to connect to
	iDBloginName	: "",				// iDB login name
	iDBloginPass	: "",				// iDB login pass
	defPass			: "fail",			// Default password to use in case of no match in mulelogger / automule
	profiles		: ["Manual"],		// Profiles that will have this enabled (likely: automules, muleloggers, droppers)
};

// No touchy! ---------------------------------------------------------------------------------------------------------
include("mulelogger.js");
include("automule.js");
include("common/misc.js");

function main() {	
	if (settings.profiles.indexOf(me.profile) === -1) { //Stop execution if we're not an enabled profile
		print("iDB skipped (disabled profile)");
		return true;
	}
	
	print("iDB loaded");
	
	var character, flags, stats, time, t, b, i, iDBLog,
		account 	= {},
		gameBuffer 	= [],
		buffer 		= [],
		items 		= {};
	
	var titles = [
		[[["Dame", "Lady", "Baroness"],["Slayer", "Champion", "Matriarch"]],[["Countess", "Duchess", "Queen"],["Destroyer", "Conquerer", "Guardian"]]],	// Amazon
		[[["Dame", "Lady", "Baroness"],["Slayer", "Champion", "Matriarch"]],[["Countess", "Duchess", "Queen"],["Destroyer", "Conquerer", "Guardian"]]],	// Sorceress
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Necromancer
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Paladin
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Barbarian
		[[["Sir",  "Lord", "Baron"   ],["Slayer", "Champion", "Patriarch"]],[["Count",    "Duke", 	 "King" ],["Destroyer", "Conquerer", "Guardian"]]],	// Druid
		[[["Dame", "Lady", "Baroness"],["Slayer", "Champion", "Matriarch"]],[["Countess", "Duchess", "Queen"],["Destroyer", "Conquerer", "Guardian"]]]	// Assassin
	];
	
	var getPassword = function(acc) {
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
		
		return settings.defPass;
	};
	
	var getRealm = function () {
		var validRealms = [
			"escl",  "escnl",  "esccl",  "esccnl",  "ehcl",  "ehcnl",  "ehccl",  "ehccnl",
			"wscl",  "wscnl",  "wsccl",  "wsccnl",  "whcl",  "whcnl",  "whccl",  "whccnl",
			"euscl", "euscnl", "eusccl", "eusccnl", "euhcl", "euhcnl", "euhccl", "euhccnl",
			"ascl",  "ascnl",  "asccl",  "asccnl",  "ahcl",  "ahcnl",  "ahccl",  "ahccnl"
		];
		
		var realm = "";
		
		switch (me.realm.toLowerCase()) {
			case 'useast':
				realm = "e";
				break;
			case 'uswest':
				realm = "w";
				break;
			case 'europe':
				realm = "eu";
				break;
			case 'asia':
				realm = "a";
				break;
		}

		if (me.playertype) {
			realm += "hc";
		} else {
			realm += "sc";
		}

		if (!me.gametype) {
			realm += "c";
		}

		if (me.ladder == 0) {
			realm += "nl";
		} else {
			realm += "l";
		}

		if (validRealms.indexOf(realm) === -1) {
			return false;
		}		
		
		return realm;
	}
	
	var pad = function(str) {
		var p = "00";
		return p.substring(0, p.length - str.length) + str;
	};
	
	var prepare = function (str) {
		return str + String.fromCharCode(3);
	}
	
	// Listeners
	
	addEventListener("realmpacket", function(pBytes) {
		if (pBytes[0] !== 0x19) {
			return false;
		}
		
		buffer.push([].slice.call(pBytes));
		return false;
	});
	
	addEventListener("gamepacket", function(pBytes) {
		if (pBytes[0] !== 0x9c && pBytes[0] !== 0x9d) {
			return false;
		}
		
		gameBuffer.push([].slice.call(pBytes));
		return false;
	});
	
	addEventListener("scriptmsg", function (msg) {
		if (msg && typeof msg === "string" && msg === "iDBLog") {
			iDBLog = true;
		}
	});
	
	// Start
	
	while (true) {
		delay(100);
		
		if (iDBLog) {
			iDBLog = false;
			
			if (!me.ingame) {
				scriptBroadcast("iDBDoneLogging");
				continue;
			}
			
			let initializationRequest = {
				type			: "InitializationRequest",
				app				: "Kolbot"
			};
			
			let logKolbotItemsRequest = {
				type			: "LogKolbotItemsRequest",
				realm			: getRealm(),
				accountName		: me.account,
				accountPassword : getPassword(me.account),
				characterName	: me.charname,
				perm			: false,
				items			: []
			};
			
			//Get char and merc items, cause we boss like that
			let charItems 	= Misc.copy(me.getItems());
			let merc 		= me.getMerc();
			let charGids 	= [];
			
			for (let i in charItems) {
				if (charItems[i].gid) {
					charGids.push(charItems[i].gid.toString());
				}
			}
			
			if (merc) {
				let mercItems = Misc.copy(merc.getItems());
				
				for (let i in mercItems) {
					if (mercItems[i].gid) {
						charGids.push(mercItems[i].gid.toString());
					}
				}
			}
			
			for (let gid in items) {
				if (charGids.indexOf(gid) > -1) {
					logKolbotItemsRequest.items.push(items[gid]);
				}
			}
			
			if (account.chars) {
				for (i = 0; i < account.chars.length; i++) {
					if (account.chars[i].charname.toLowerCase() === me.charname.toLowerCase()) {
						logKolbotItemsRequest.perm = account.chars[i].perm;
					}
				}
			}
			
			try {
				/*initializationRequest.name = settings.iDBloginName;
				initializationRequest.password = settings.iDBloginPass;
				let initializationRequestStr = JSON.stringify(initializationRequest);
				
				logKolbotItemsRequest.databaseName = settings.iDBdatabaseName;
				let logKolbotItemsRequestStr = JSON.stringify(logKolbotItemsRequest);
				
				let con = Socket.open(settings.iDBaddress, settings.iDBport);
				con.send(String.fromCharCode(2));
				con.send(prepare(initializationRequestStr));
				con.send(prepare(logKolbotItemsRequestStr));
			
				print("Sent to iDB..");
				
				con.read();
				con.close();
				con = false;*/
			} catch (e) {
				FileTools.appendText("iDB-Failed-" + settings.iDBdatabaseName + ".txt", logKolbotItemsRequest.realm + "/" + logKolbotItemsRequest.accountName + "/" + logKolbotItemsRequest.accountPassword + "\n");
				print(e);
			}

			scriptBroadcast("iDBDoneLogging");
			continue;
		}
		
		while (gameBuffer.length) {
			let itemPacket 	= gameBuffer.shift();
			let itemBytes 	= itemPacket.map(d => pad(d.toString(16))).join(" ");
			let itemGid 	= itemPacket.slice(4, 8).reverse();
			
			if (itemPacket[0] === 0x9d && itemPacket[8] === 0x04) { // Item is socketed in another item
				let parentGid = itemPacket.slice(9, 13).reverse();
				parentGid = ((parentGid[0] << 24) + (parentGid[1] << 16) + (parentGid[2] << 8) + (parentGid[3])) >>> 0;
				
				if (items.hasOwnProperty(parentGid.toString())) {
					items[parentGid.toString()] += "," + itemBytes;
				}
				else {
					print("Error! Didn't find parent item for this socketed item.");
				}
				
				continue;
			}
			
			let itemGidDword = ((itemGid[0] << 24) + (itemGid[1] << 16) + (itemGid[2] << 8) + (itemGid[3])) >>> 0;
			items[itemGidDword.toString()] = itemBytes;
		}
		
		if (!buffer.length) {
			continue;
		}	
		
		items 	= {}; // Empty the saved items
		account	= {}; // Start fresh
		
		let byteArray 	= buffer.shift();
		let hex 		= byteArray.map(d => pad(d.toString(16))).join(" ");
		let numchars 	= parseInt(byteArray[3]);
		let time 		= Math.round(new Date().getTime()/1000);
		let bytes 		= byteArray.slice(9, byteArray.length);
		
		account.account = me.account;
		account.realm	= me.realm.toLowerCase();
		account.profile = me.profile;
		account.perming = false;
		account.time	= time;
		account.chars	= [];
		
		for (i = 0; i < numchars; i++) {
			character = {};
			
			t = bytes.slice(0, 4).reverse();
			t = ((t[t.length - 1]) | (t[t.length - 2] << 8) | (t[t.length - 3] << 16) | (t[t.length - 4] << 24) >>> 0);
			t = (t - time) / (60 * 60); // hours
			
			bytes = bytes.slice(4, bytes.length);
			character.charname = "";
			
			while (bytes.length) {
				b = bytes.shift();
				
				if (b === 0x00) {
					break;
				}	
				
				character.charname += String.fromCharCode(b);
			}
			
			flags 				= bytes[26];
			character.expiry 	= Math.round(t * 100) / 100; //round to 2 decimals
			character.perm 		= character.expiry > (11 * 24);
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
			
			account.chars.push(character);
			//print(JSON.stringify(character));
		}
	}
	
	return true;
}