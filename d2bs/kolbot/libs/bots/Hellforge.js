/**
*	@filename	Hellforge.js
*	@author		LAZ
*	@desc		Hellforge script
*/

function Hellforge() {
	if (me.diff !== 2) 			return true; 	// Not in hell
	if (!Pather.accessToAct(4))	return true; 	// Meph not done or no access to A4
    if (me.getQuest(27, 1)) 	return true; 	// Forge completed
	
	this.getStone = function() {
		var npc,
			stone = me.getItem(551),
			oot = !me.inTown;
		
		if (stone && stone.location === 3) {
			return true;
		}
		
		Town.goToTown(4);
		Town.move(NPC.Cain);
		
		npc = getUnit(1, NPC.Cain);
		
		if (npc) {
			npc.openMenu();
			me.cancel();
		}
		
		stone = me.getItem(551);
		
		if (!stone) return false;
		if (stone.location !== 3) {
			Storage.Inventory.MoveTo(stone);
		}
		
		return (stone && stone.location === 3);
	};
	
	this.killHephasto = function() {
		var target, merc, i;
		
		for (i = 0; i < 500; i++) {
			if (getDistance(me, forge) > 40) { // Don't stray from forge area
				Pather.moveTo(forge.x, forge.y);
			}
			
			target = getUnit(1, 409);
			
			if (!target) return false;
			
			me.overhead("Hephasto Life: " + (target.hp * 100 / 128));
			
			if (getDistance(me, target) < 20) {
                Attack.deploy(target, 25, 5, 35);
            }
			
			merc = me.getMerc();
			
            if (merc && getDistance(merc, target) < 10) {
                Pather.teleportTo(me.x, me.y, 1);
            }
			
			ClassAttack.doAttack(target, false);
			
			if (target.dead) {
				Pather.moveTo(target.x, target.y);
				delay(1 + me.ping * 4);
				return true;
			}
		}
		
		return false;
	};
	
	this.equipHammer = function() {
		var oldItem,
			hammer = me.getItem(90);
		if (!hammer) return false;
		
		oldItem = me.findItem(-1, -1, -1, -1, 4);
		
		if (oldItem) {
			Storage.Cube.MoveTo(oldItem);
		}
		
		Item.equip(hammer, 4);
		return true;
	};
	
	var forge, hammer, oldItem;
	
	me.overhead("starting hell forge");

    Town.doChores();
    Pather.useWaypoint(107);
    Precast.doPrecast(true);

    if (!Pather.moveToPreset(me.area, 2, 376)) { 
		throw new Error("Failed to move to Hephasto");
	}
	
	forge = getUnit(2, 376);
	
	if (!this.killHephasto()) {
		throw new Error("Failed to kill Hephasto");
	}
	
	hammer = getUnit(4, 90);
	
	if (!hammer) {
		throw new Error("Failed to pick hammer");
	}
	
	Pickit.pickItem(hammer);
	
	if (!this.getStone()) {
		throw new Error("Failed to get soulstone");
	}
	
	if (!this.equipHammer()) {
		throw new Error("Failed to equip hammer");
	}
	
	if (me.inTown) {
		Town.move("portalspot");
		Pather.usePortal(null, me.name);
	}
	
	Pather.moveTo(forge.x + 2, forge.y + 2);
	
	while (getUnit(2, 376).mode < 3) {
		if (me.classid === 1 && me.getSkill(43, 1)) { // Use telek if you have it
			Skill.cast(43, 0, getUnit(2, 376));
		} else {
			getUnit(2, 376).interact();
		}
		
		delay(200 + me.ping * 2);
	}
	
	Town.goToTown();
	
	oldItem = me.findItem(-1, -1, 6);
	if (oldItem) {
		Item.equip(oldItem, 4);
		me.cancel();
	}
	delay(5000);
	Pather.usePortal(null, me.name);
	
	Pickit.pickItems();
	Town.goToTown();

    return true;
}
