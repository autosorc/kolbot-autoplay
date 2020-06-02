function LoadConfig() {
	Config.MakeRunewords 	= false;
	Config.Cubing 			= !!me.getItem(549);
	Config.Gamble 			= true;
	Config.GambleGoldStart 	= (me.diff === 2 && me.getQuest(22, 0)) ? 2000000 : 1000000;
	Config.GambleGoldStop 	= (me.diff === 2 && me.getQuest(22, 0)) ? 350000 : 500000;
	Config.AutoEquip 		= true;
	
	Scripts.IPHunter 		= false;
		Config.IPHunter.IPList 		= []; 	// List of IPs to look for. example: [165, 201, 64]
		Config.IPHunter.GameLength 	= 3; 	// Number of minutes to stay in game if ip wasn't found
	
	Scripts.Manual 			= false;
	Scripts.Sorc 			= true;
	Scripts.Hellforge 		= me.getQuest(27, 0) && me.gold > 600000;

	Config.ChestMania.Act1 = [13, 14, 15, 16];
	Config.ChestMania.Act2 = [55, 59, 66, 67, 68, 69, 70, 71, 72];
	Config.ChestMania.Act3 = [79, 80, 81, 92, 93, 84];
	Config.ChestMania.Act4 = [];
	Config.ChestMania.Act5 = [];

	Config.PickitFiles.push("Sorc/quest.nip");
	
	if (me.diff === 2) {try{include("ShopDrop.js");Config.PickitFiles.push("shop/"+ShopDrop.getRealmAcro()+".nip");}catch(e){}}

	if (me.gametype === 1) {
		Config.MakeRunewords = true;
		
		Config.PickitFiles.push("Sorc/Autoequip/expansion_sorc.nip");
		Config.PickitFiles.push("Sorc/Autoequip/expansion_merc.nip");
		Config.PickitFiles.push("Sorc/Autoequip/expansion_charms.nip");
		Config.PickitFiles.push("Sorc/Autoequip/expansion_runewords.nip");
		
		if (me.ladder > 0) {
			Config.PickitFiles.push("Sorc/Expansion/Ladder/Crafted.nip");
			Config.PickitFiles.push("Sorc/Expansion/Ladder/Magic.nip");
			Config.PickitFiles.push("Sorc/Expansion/Ladder/Misc.nip");
			Config.PickitFiles.push("Sorc/Expansion/Ladder/Rare.nip");
			Config.PickitFiles.push("Sorc/Expansion/Ladder/Set.nip");
			Config.PickitFiles.push("Sorc/Expansion/Ladder/Unid.nip");
			Config.PickitFiles.push("Sorc/Expansion/Ladder/Unique.nip");
			Config.PickitFiles.push("Sorc/Expansion/Ladder/White.nip");
		} else {
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/Crafted.nip");
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/Magic.nip");
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/Misc.nip");
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/Rare.nip");
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/Set.nip");
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/Unid.nip");
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/Unique.nip");
			Config.PickitFiles.push("Sorc/Expansion/NonLadder/White.nip");
		}
		
		if (me.charlvl >= 85) {
			Config.GambleItems.push("Amulet");
			Config.Recipes.push([Recipe.Blood.Ring]);
			Config.Recipes.push([Recipe.Caster.Amulet]);
		} else {
			Config.GambleItems.push("Ring");
		}
		
		Config.GambleItems.push("Circlet");
		Config.GambleItems.push("Coronet");
		
		if (me.diff !== 2) { //[rw], [base], [eth], [wait for base to start picking runes]
			Config.Runewords.push([Runeword.AncientsPledge, "Large Shield", Roll.NonEth]);
			Config.Runewords.push([Runeword.AncientsPledge, "Kite Shield", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.AncientsPledge, "Bone Shield", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.AncientsPledge, "Grim Shield", 	Roll.NonEth]);
			Config.KeepRunewords.push("[type] == shield # [fireresist]+[lightresist]+[coldresist]+[poisonresist] == 187");
			
			Config.Runewords.push([Runeword.Spirit, "Crystal Sword", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Spirit, "Broad Sword", 		Roll.NonEth]);
			Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 && [maxmana] >= 89");
			
			Config.Runewords.push([Runeword.Smoke, "Quilted Armor", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Leather Armor", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Hard Leather Armor",Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Studded Leather", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Ring Mail", 		Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Scale Mail", 		Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Breast Plate", 		Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Light Plate", 		Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Ghost Armor", 		Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor", Roll.NonEth]);
			Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");
			
			Config.Runewords.push([Runeword.Insight, "Voulge", 			Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Scythe", 			Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Poleaxe", 		Roll.All]);
			Config.Runewords.push([Runeword.Insight, "War Scythe", 		Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Bill", 			Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Battle Scythe", 	Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Partizan", 		Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Grim Scythe", 	Roll.All]);	
		}
		
		if (me.charlvl <= 87) {
			Config.Runewords.push([Runeword.Treachery, "Ring Mail", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Treachery, "Light Plate", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Treachery, "Breast Plate", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Treachery, "Mage Plate", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Treachery, "Wire Fleece", 	Roll.NonEth]);
			Config.Runewords.push([Runeword.Treachery, "Dusk Shroud", 	Roll.NonEth]);
			Config.KeepRunewords.push("[name] == MagePlate # [ias] == 45 && [coldresist] == 30");
			
			Config.Runewords.push([Runeword.Insight, "Colossus Voulge", Roll.Eth]);
			Config.Runewords.push([Runeword.Insight, "Thresher", 		Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Cryptic Axe", 	Roll.All]);
			Config.Runewords.push([Runeword.Insight, "Giant Thresher", 	Roll.All]);
			Config.KeepRunewords.push("[type] == polearm # [strength] == 5 && [fcr] == 35");			
		} else {
			//Past 87 wait for the base before stacking a bunch of runes
			Config.Runewords.push([Runeword.Insight, "Colossus Voulge", Roll.Eth, 		true]);
			Config.Runewords.push([Runeword.Insight, "Thresher", 		Roll.All, 		true]);
			Config.Runewords.push([Runeword.Insight, "Cryptic Axe", 	Roll.All,		true]);
			Config.Runewords.push([Runeword.Insight, "Giant Thresher", 	Roll.All, 	 	true]);
			Config.KeepRunewords.push("[type] == polearm # [strength] == 5 && [fcr] == 35");			
		}
		
		if (me.charlvl >= 85) {
			Config.Runewords.push([Runeword.Spirit, "Monarch", 			Roll.NonEth, 	true]);
			Config.Runewords.push([Runeword.Spirit, "Sacred Targe", 	Roll.NonEth, 	true]);
			Config.KeepRunewords.push("[name] == Monarch # [fcr] >= 35 && [maxmana] >= 89");	
			Config.KeepRunewords.push("[name] == SacredTarge # [fcr] >= 25 && [maxmana] >= 89");
		}
		
		if (me.charlvl >= 90 && !Precast.checkCTA()) {
			Config.PickitFiles.push("Sorc/Autoequip/expansion_cta.nip");
			Config.Runewords.push([Runeword.CallToArms, "Crystal Sword",Roll.NonEth]);
			Config.KeepRunewords.push("[name] == CrystalSword # [plusskillbattleorders] >= 1");
		}
		
		Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate", Roll.Eth]);
		Config.Recipes.push([Recipe.Socket.Armor, "Sacred Armor", Roll.Eth]);
		//Config.Recipes.push([Recipe.Rune, "Io Rune"]); 	// Upgrade Io to Lum
		//Config.Recipes.push([Recipe.Rune, "Sur Rune"]); 	// Upgrade Sur to Ber
		if (me.findItem(375, -1, 1, 7) && me.findItem(375, -1, 1, 7).itemcount < 2) Config.Recipes.push([Recipe.Gem, "Flawless Diamond"]); // Make Perfect Diamonds for mosers
	}

	if (me.gametype === 0) {
		Config.PickitFiles.push("Sorc/Classic/classic_rare.nip");
		Config.PickitFiles.push("Sorc/Classic/classic_other.nip");
		Config.PickitFiles.push("Sorc/Autoequip/classic_sorc.nip");

		if (me.charlvl >= 87) {
			Config.GambleItems.push("Amulet");
		} else {
			Config.GambleItems.push("Ring");
		}
	}
	
	Config.Leader 			= ""; 		// Leader's ingame character name. Leave blank to try auto-detection (works in AutoBaal, Wakka, MFHelper)
	Config.QuitList 		= [""]; 	// List of character names to quit with. Example: Config.QuitList = ["MySorc", "MyDin"];
	Config.QuitListMode 	= 0; 		// 0 = use character names; 1 = use profile names (all profiles must run on the same computer).

	// Town settings
	Config.HealHP 			= 90; 		// Go to a healer if under designated percent of life.
	Config.HealMP 			= 90; 		// Go to a healer if under designated percent of mana.
	Config.HealStatus 		= false; 	// Go to a healer if poisoned or cursed
	Config.UseMerc 			= true; 	// Use merc. This is ignored and always false in d2classic.
	Config.MercWatch 		= false; 	// Instant merc revive during battle.
	
	// Potion settings
	Config.UseHP 			= me.playertype ? 70 : 55; 	// Drink a healing potion if life is under designated percent.
	Config.UseRejuvHP 		= me.playertype ? 50 : 35;  // Drink a rejuvenation potion if life is under designated percent.
	Config.UseMP 			= 30; 		// Drink a mana potion if mana is under designated percent.
	Config.UseRejuvMP 		= 0; 		// Drink a rejuvenation potion if mana is under designated percent.
	Config.UseMercHP 		= 75; 		// Give a healing potion to your merc if his/her life is under designated percent.
	Config.UseMercRejuv 	= 0; 		// Give a rejuvenation potion to your merc if his/her life is under designated percent.
	Config.HPBuffer 		= (me.diff === 2 && me.getQuest(22, 0)) ? 0 : 2; // Number of healing potions to keep in inventory.
	Config.MPBuffer 		= (me.diff === 2 && me.getQuest(22, 0)) ? 2 : 4; // Number of mana potions to keep in inventory.
	Config.RejuvBuffer 		= 2; 		// Number of rejuvenation potions to keep in inventory.

	// Chicken settings
	Config.LifeChicken 		= me.playertype ? 35 : 10; 		// Exit game if life is less or equal to designated percent.
	Config.ManaChicken 		= 0; 		// Exit game if mana is less or equal to designated percent.
	Config.MercChicken 		= 0; 		// Exit game if merc's life is less or equal to designated percent.
	Config.TownHP 			= 0; 		// Go to town if life is under designated percent.
	Config.TownMP 			= 0; 		// Go to town if mana is under designated percent.
	
	// Inventory
	Config.Inventory[0] 	= [1,1,1,1,1,1,1,1,1,1];
	Config.Inventory[1] 	= [1,1,1,1,1,1,1,1,1,1];
	Config.Inventory[2] 	= [1,1,1,1,1,1,1,1,1,1];
	Config.Inventory[3] 	= [1,1,1,1,1,1,1,1,1,1];
	
	// Gold
	Config.StashGold 		= 100; 		// Minimum amount of gold to stash. Later levels set in build
	Config.LowGold 			= ((me.diff === 2 && me.getQuest(22, 0)) || (me.diff === 0 && me.act === 2)) ? 300000 : 800000; 	// Start selling crap items if lower.
	Config.MinGold 			= me.charlvl + 3; // Minimum gold value per slot a crap item takes. If an item is worth 200 gold to sell and takes 4 slots, each slot is worth 50gold and mingold above this would not pick the item (limits items to actually valuable ones hopefully) 
	
	// Potions
	Config.BeltColumn[0] 	= "hp";
	Config.BeltColumn[1] 	= "hp";
	Config.BeltColumn[2] 	= "hp";
	Config.BeltColumn[3] 	= "mp";

	Config.MinColumn[0] 	= 3;
	Config.MinColumn[1] 	= 3;
	Config.MinColumn[2] 	= 3;
	Config.MinColumn[3] 	= 3;

	// Pickit
	Config.PickRange 		= 40; 		// Pick radius
	Config.FastPick 		= false; 	// Check and pick items between attacks
	
	// Automule
	Config.AutoMule.Trigger = [];
	Config.AutoMule.Force 	= [];
	Config.AutoMule.Exclude = [];

	// Additional item info log settings. All info goes to \logs\ItemLog.txt
	Config.ItemInfo 		= false; 	// Log stashed, skipped (due to no space) or sold items.
	Config.ItemInfoQuality 	= []; 		// The quality of sold items to log. See NTItemAlias.dbl for values. Example: Config.ItemInfoQuality = [6, 7, 8];

	// Item identification settings
	Config.CainID.Enable 	= false; 	// Identify items at Cain
	Config.CainID.MinGold 	= 2500000; 	// Minimum gold (stash + character) to have in order to use Cain.
	Config.CainID.MinUnids 	= 3; 		// Minimum number of unid items in order to use Cain.
	Config.FieldID 			= me.diff === 2 && me.getQuest(22, 0) && me.gold > 100000; 	// Identify items in the field instead of going to town.
	Config.DroppedItemsAnnounce.Enable 	= false;	// Announce Dropped Items to in-game newbs
	Config.DroppedItemsAnnounce.Quality = []; 		// Quality of item to announce. See NTItemAlias.dbl for values. Example: Config.DroppedItemsAnnounce.Quality = [6, 7, 8];

	// Manager Item Log Screen
	Config.LogKeys 			= true; 	// Log keys on item viewer
	Config.LogOrgans 		= true; 	// Log organs on item viewer
	Config.LogLowRunes 		= true; 	// Log low runes (El - Dol) on item viewer
	Config.LogMiddleRunes 	= true; 	// Log middle runes (Hel - Mal) on item viewer
	Config.LogHighRunes 	= true; 	// Log high runes (Ist - Zod) on item viewer
	Config.LogLowGems 		= true; 	// Log low gems (chipped, flawed, normal) on item viewer
	Config.LogHighGems 		= true; 	// Log high gems (flawless, perfect) on item viewer
	Config.SkipLogging 		= []; 		// Custom log skip list. Set as three digit item code or classid. Example: ["tes", "ceh", 656, 657] will ignore logging of essences.
	Config.ShowCubingInfo 	= true; 	// Show cubing messages on console

	// Repair settings
	Config.CubeRepair 		= false; 	// Repair weapons with Ort and armor with Ral rune. Don't use it if you don't understand the risk of losing items.
	Config.RepairPercent 	= 40; 		// Durability percent of any equipped item that will trigger repairs.

	// Public game options
	Config.LocalChat.Enabled = false; 	// enable the LocalChat system
	Config.LocalChat.Toggle = false; 	// optional, set to KEY value to toggle through modes 0, 1, 2
	Config.LocalChat.Mode 	= 0; 		// 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
	Config.PublicMode 		= 0; 		// 1 = invite and accept, 2 = accept only, 3 = invite only, 0 = disable
	Config.Greetings 		= []; 		// Example: ["Hello, $name (level $level $class)"]
	Config.DeathMessages 	= []; 		// Example: ["Watch out for that $killer, $name!"]
	Config.Congratulations 	= []; 		// Example: ["Congrats on level $level, $name!"]
	Config.ShitList 		= false; 	// Blacklist hostile players so they don't get invited to party.
	Config.UnpartyShitlisted = false; 	// Leave party if someone invited a blacklisted player.

	// General config
	Config.AutoMap 			= false; 	// Set to true to open automap at the beginning of the game.
	Config.LastMessage 		= ""; 		// Message or array of messages to say at the end of the run. Use $nextgame to say next game - "Next game: $nextgame" (works with lead entry point)
	Config.MinGameTime 		= 400; 		// Min game time in seconds. Bot will TP to town and stay in game if the run is completed before.
	Config.MaxGameTime 		= me.charlvl > 87 ? 7200 : 3600; // Maximum game time in seconds. Quit game when limit is reached.
	Config.TeleSwitch 		= false; 	// Switch to secondary (non-primary) slot when teleporting more than 5 nodes.
	Config.OpenChests 		= me.charlvl >= 19; // Open chests. Controls key buying.
	Config.MiniShopBot 		= me.charlvl >= 82 && me.gold > 800000; // Scan items in NPC shops.
	Config.PacketShopping 	= true; 	// Use packets to shop. Improves shopping speed.
	Config.TownCheck 		= false; 	// Go to town if out of potions
	Config.LogExperience 	= false; 	// Print experience statistics in the manager.
	Config.PingQuit 		= [{Ping: 0, Duration: 0}]; // Quit if ping is over the given value for over the given time period in seconds.

	// Shrine Scanner - scan for shrines while moving.
	// Put the shrine types in order of priority (from highest to lowest). For a list of types, see sdk/shrines.txt
	Config.ScanShrines 		= [15,1,2,3,4,5,6,8,9,10,11,12,13,14];

	// MF Switch
	Config.MFSwitchPercent 	= 0; 		// Boss life % to switch to secondary weapon slot. Set to 0 to disable.
	Config.PrimarySlot 		= -1; 		// Set to use specific weapon slot as primary weapon slot: -1 = disabled, 0 = slot I, 1 = slot II

	// Speedup config. Full packet casting is not recommended for melee skills.
	Config.FCR 				= 255; 		// 0 - disable, 1 to 255 - set value of Faster Cast Rate.
	Config.FHR 				= 255;  	// 0 - disable, 1 to 255 - set value of Faster Hit Recovery.
	Config.FBR 				= 255; 		// 0 - disable, 1 to 255 - set value of Faster Block Recovery.
	Config.IAS 				= 255; 		// 0 - disable, 1 to 255 - set value of Increased Attack Speed.
	Config.PacketCasting 	= 1; 		// 0 = disable, 1 = packet teleport, 2 = full packet casting.
	Config.WaypointMenu 	= true; 	// Set to true for Single and private realms

	// Anti-hostile config
	Config.AntiHostile 		= false; 	// Enable anti-hostile.
	Config.HostileAction 	= 0; 		// 0 - quit immediately, 1 - quit when hostile player is sighted, 2 - attack hostile.
	Config.TownOnHostile 	= false; 	// Go to town instead of quitting when HostileAction is 0 or 1.
	Config.RandomPrecast 	= false; 	// Anti-PK measure, only supported in Baal and BaalHelper and BaalAssisstant at the moment.
	Config.ViperCheck 		= false; 	// Quit if revived Tomb Vipers are sighted.

	// DClone config
	Config.StopOnDClone 	= true; 	// Go to town and idle as soon as Diablo walks the Earth
	Config.SoJWaitTime 		= 5; 		// Time in minutes to wait for another SoJ sale before leaving game. 0 = disabled
	Config.KillDclone 		= false; 	// Go to Palace Cellar 3 and try to kill Diablo Clone. Pointless if you already have Annihilus.
	Config.DCloneQuit 		= false; 	// 1 = quit when Diablo walks, 2 = quit on soj sales, 0 = disabled
	Config.WaitForHunter 	= false;
	
	// Monster skip config
	// Skip immune monsters. Possible options: "fire", "cold", "lightning", "poison", "physical", "magic".
	// You can combine multiple resists with "and", for example - "fire and cold", "physical and cold and poison"
	Config.SkipImmune 		= [];
	// Skip enchanted monsters. Possible options: "extra strong", "extra fast", "cursed", "magic resistant", "fire enchanted", "lightning enchanted", "cold enchanted", "mana burn", "teleportation", "spectral hit", "stone skin", "multiple shots".
	// You can combine multiple enchantments with "and", for example - "cursed and extra fast", "mana burn and extra strong and lightning enchanted"
	Config.SkipEnchant 		= [];
	// Skip monsters with auras. Possible options: "fanaticism", "might", "holy fire", "blessed aim", "holy freeze", "holy shock". Conviction is bugged, don't use it.
	Config.SkipAura 		= [];
	// Uncomment the following line to always attempt to kill these bosses despite immunities and mods
	//Config.SkipException = [getLocaleString(2851), getLocaleString(2852), getLocaleString(2853)]; // vizier, de seis, infector

	// DO NOT TOUCH.
	Config.AttackSkill[0] 	= -1; 		// Preattack skill.
	Config.AttackSkill[1] 	= 36; 		// Primary skill to bosses.
	Config.AttackSkill[2] 	= -1; 		// Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] 	= 36; 		// Primary skill to others.
	Config.AttackSkill[4] 	= -1; 		// Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] 	= -1; 		// Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] 	= -1; 		// Secondary untimed skill if monster is immune to primary untimed.

	// Low mana skills - these will be used if main skills can't be cast.
	Config.LowManaSkill[0] 	= 0; 		// Timed low mana skill.
	Config.LowManaSkill[1] 	= 0; 		// Untimed low mana skill.

	/* Advanced Attack config. Allows custom skills to be used on custom monsters.
	 *	Format: "Monster Name": [timed skill id, untimed skill id]
	 *	Example: "Baal": [38, -1] to use charged bolt on Baal
	 *	Multiple entries are separated by commas
	 */
	Config.CustomAttack = {
		"Fallen Shaman": [36, 36]
	};

	Config.Dodge 			= false; 	// Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange 		= 15; 		// Distance to keep from monsters.
	Config.DodgeHP 			= 100; 		// Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
	Config.BossPriority 	= false; 	// Set to true to attack Unique/SuperUnique monsters first when clearing
	Config.ClearType 		= 0; 		// Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
	Config.TeleStomp 		= false; 	// Use merc to attack bosses if they're immune to attacks, but not to physical damage

	// Wereform setup. Make sure you read Templates/Attacks.txt for attack skill format.
	Config.Wereform 		= false; 	// 0 / false - don't shapeshift, 1 / "Werewolf" - change to werewolf, 2 / "Werebear" - change to werebear

	// Class specific config
	Config.CastStatic 		= 20; 		// Cast static until the target is at designated life percent. 100 = disabled.
	Config.StaticList 		= ["Izual"]; 	// List of monster NAMES or CLASSIDS to static. Example: Config.StaticList = ["Andariel", 243];

	/* AutoSkill builds character based on array defined by the user and it replaces AutoBuild's skill system.
	 * AutoSkill will automatically spend skill points and it can also allocate any prerequisite skills as required.
	 *
	 * Format: Config.AutoSkill.Build = [[skillID, count, satisfy], [skillID, count, satisfy], ... [skillID, count, satisfy]];
	 *	skill - skill id number (see /sdk/skills.txt)
	 *	count - maximum number of skill points to allocate for that skill
	 *	satisfy - boolean value to stop(true) or continue(false) further allocation until count is met. Defaults to true if not specified.
	 *
	 *	See libs/config/Templates/AutoSkillExampleBuilds.txt for Config.AutoSkill.Build examples.
	 */
	Config.AutoSkill.Enabled 	= false; 	// Enable or disable AutoSkill system
	Config.AutoSkill.Save 		= 0; 		// Number of skill points that will not be spent and saved
	Config.AutoSkill.Build 		= [];

	/* AutoStat builds character based on array defined by the user and this will replace AutoBuild's stat system.
	 * AutoStat will stat Build array order. You may want to stat strength or dexterity first to meet item requirements.
	 *
	 * Format: Config.AutoStat.Build = [[statType, stat], [statType, stat], ... [statType, stat]];
	 *	statType - defined as string, or as corresponding stat integer. "strength" or 0, "dexterity" or 2, "vitality" or 3, "energy" or 1
	 *	stat - set to an integer value, and it will spend stat points until it reaches desired *hard stat value (*+stats from items are ignored).
	 *	You can also set stat to string value "all", and it will spend all the remaining points.
	 *	Dexterity can be set to "block" and it will stat dexterity up the the desired block value specified in arguemnt (ignored in classic).
	 *
	 *	See libs/config/Templates/AutoStatExampleBuilds.txt for Config.AutoStat.Build examples.
	 */
	Config.AutoStat.Enabled 	= false; 	// Enable or disable AutoStat system
	Config.AutoStat.Save 		= 0; 		// Number stat points that will not be spent and saved.
	Config.AutoStat.BlockChance = 0; 		// An integer value set to desired block chance. This is ignored in classic.
	Config.AutoStat.UseBulk 	= true; 	// Set true to spend multiple stat points at once (up to 100), or false to spend singe point at a time.
	Config.AutoStat.Build 		= [];

	// AutoBuild System ( See /d2bs/kolbot/libs/config/Builds/README.txt for instructions )
	Config.AutoBuild.Enabled 	= true;		//	This will enable or disable the AutoBuild system

	Config.AutoBuild.Template 	= "Sorc";	//	The name of the build associated with an existing
											//	template filename located in libs/config/Builds/

	Config.AutoBuild.Verbose 	= false;	//	Allows script to print messages in console
	Config.AutoBuild.DebugMode 	= false;	//	Debug mode prints a little more information to console and
											//	logs activity to /logs/AutoBuild.CharacterName._MM_DD_YYYY.log
											//	It automatically enables Config.AutoBuild.Verbose
}