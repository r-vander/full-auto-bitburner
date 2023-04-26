/** @param {NS} ns */
export async function main(ns) {
	let t = ('1');
	let host = ns.getHostname();
	ns.disableLog("ALL");
	ns.tail();
	await ns.sleep(200);
	ns.resizeTail(310, 55);
	if (ns.getServerMaxRam(host) < 8) {
		ns.clearLog();
		ns.resizeTail(310, 110);
		ns.print('Server owner too poor to run this script');
		ns.exit();
	}

	if ((ns.getServerMaxRam(host) - ns.getServerUsedRam(host) < 8)) {
		ns.clearLog();
		ns.resizeTail(310, 110);
		ns.print('Not enough RAM, kill other scripts or buy more RAM');
		ns.exit();
	}

	while (true) {
		t = (Math.floor(((ns.getServerMaxRam(host) - 8) - ns.getServerUsedRam(host)) / 4));
		if (t > 1) {
			ns.clearLog();
			ns.print('Sharing Threads to Factions...');
			ns.run('rep.js', t);
		}


		await ns.sleep(200);
	}

}
