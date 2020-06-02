/**
 *    @filename   addRunewords.js
 *    @desc       Runewords to make and keep in hell
 */

var addRunewords = [ //Add these runewords if we have shit currently and are in hell (Config only makes them in normal + nightmare)
	{name:"Spirit", slot:4, tier:136501, pickit:"([name] == BroadSword || [name] == crystalsword) && [quality] <= superior && [flag] != ethereal # [sockets] == 4 # [MaxQuantity] == 1", make:[
		[Runeword.Spirit, "Crystal Sword"],
		[Runeword.Spirit, "Broad Sword"],
		[Runeword.Spirit, "Long Sword"]],
		keep:["[type] == sword # [fcr] >= 25 && [maxmana] >= 89"]},
		
	{name: "Smoke", slot:3, tier:15000015, pickit:"([name] == SerpentskinArmor || [name] == GhostArmor || [name] == LightPlate || [name] == BreastPlate || [name] == RingMail || [name] == StuddedLeather || [name] == HardLeatherArmor || [name] == LeatherArmor || [name] == QuiltedArmor) && [quality] == superior # [sockets] == 2 # [MaxQuantity] == 1", make:[
		[Runeword.Smoke, "Quilted Armor"],
		[Runeword.Smoke, "Leather Armor"],
		[Runeword.Smoke, "Hard Leather Armor"],
		[Runeword.Smoke, "Studded Leather"],
		[Runeword.Smoke, "Ring Mail"],
		[Runeword.Smoke, "Scale Mail"],
		[Runeword.Smoke, "Breast Plate"],
		[Runeword.Smoke, "Light Plate"],
		[Runeword.Smoke, "Ghost Armor"],
		[Runeword.Smoke, "Serpentskin Armor"]],
		keep:["[type] == armor # [fireresist] == 50"]},
		
	{name:"Ancient's Pledge", slot:5, tier:13900019, pickit:"([Name] == GrimShield || [Name] == BoneShield || [Name] == KiteShield || [Name] == LargeShield) && [Quality] <= Superior && [Flag] != Ethereal # [Sockets] == 3 # [MaxQuantity] == 1", make:[
		[Runeword.AncientsPledge, "Large Shield"],
		[Runeword.AncientsPledge, "Kite Shield"],
		[Runeword.AncientsPledge, "Bone Shield"],
		[Runeword.AncientsPledge, "Grim Shield"]],
		keep:["[type] == shield # [fireresist]+[lightresist]+[coldresist]+[poisonresist] == 187"]}
];