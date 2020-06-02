/**
*	@filename	Hunter.js
*	@author		laz
*	@desc		Go to Palace Cellar level 3 and kill Diablo Clone.
*/

function Hunter() {
	var haveAnni;
	
	include("Hunter.js");
	delay(500);
	
	Hunter.init();
	
	if (!Hunter.isHunter) {
		D2Bot.printToConsole("Settings not found in Hunter.js");
		return true;
	}
	
	Town.doChores();
	Hunter.setPickit();
	haveAnni = Hunter.haveAnni();
	
	if (haveAnni) {
		if (Hunter.keepAnni()) {
			if (AutoMule.getInfo() && AutoMule.getInfo().hasOwnProperty("torchMuleInfo")) {
				me.overhead("Muling anni");
				scriptBroadcast("muleAnni");
				return true;
			}			
		} else { // Anni we had wasn't good, drop it and keep going
			me.findItem(519, 0, 3).drop();
			haveAnni = false;
		}
	}
	
	Pather.useWaypoint(74);
	Precast.doPrecast(true);
	Pather.usePortal(null);
	
	if (!getUnit(1, 333) && me.area === 54) { // We are in the correct area and clone is nowhere to be found
		Hunter.jobDone();
		return true;
	}
	
	if (!Attack.kill(333)) { // Failed to kill clone somehow, try again next run
		return true;
	}
	
	Pickit.pickItems();
	Town.goToTown();
	haveAnni = Hunter.haveAnni();
	
	if (haveAnni) {
		if (Hunter.keepAnni()) {
			if (AutoMule.getInfo() && AutoMule.getInfo().hasOwnProperty("torchMuleInfo")) {
				me.overhead("Muling anni");
				Hunter.jobDone();
				scriptBroadcast("muleAnni");
			}			
		} else {
			me.findItem(519, 0, 3).drop();
			Hunter.jobDone();
		}
	}
	
	return true;
}