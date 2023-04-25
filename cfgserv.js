/** @param {NS} ns */
//Auto server purchase and configurator v2.0
export async function main(ns) {
	//Define variables first because JS is dumb unlike Python 3
	let name = (ns.args[0]);
	let ram = ('2');
	let num = ('1');

	//Make the console window clean and compact
	ns.disableLog("ALL");
	ns.tail();
	await ns.sleep(500);  //Sleep to prevent script crashing
	ns.resizeTail(320, 85);

	//Just incase user forgets and runs script with no server group name in args
	if (ns.args.length < '1') {
		ns.resizeTail(320, 105);
		ns.print('No server name given with script');
		ns.exit();
	}

	//Buy 2 GB servers until we have the max (25)
	while (num <= 25) {
		if (ns.getPurchasedServerCost(ram) < ns.getServerMoneyAvailable('home')) {
			if (!ns.serverExists(name + num)) {
				ns.purchaseServer(name + num, ram);
			}
			num++;
		}
		ns.clearLog();
		ns.print('Servers Owned ', num - 1, '/25');
		await ns.sleep(1000);  //Sleep to prevent script crashing
	}
	num = ('1');


	//Files we want to copy to our purchased servers, make sure to use full paths if they are in folders
	const files = ["/auto/hack.js", "/auto/weak.js", "/auto/grow.js", "/auto/autohax.js"];

	//Copy the auto-hacktools to the new servers
	while (num <= 25) {
		ns.scp(files, name + num, "home");
		ns.clearLog();
		ns.print('Copy hacktools to ', name + num);
		num++;
		await ns.sleep(1000);  //Sleep to prevent script crashing
	}
	num = ('1');
	ram *= 4;

	//Upgrade the servers until they have 131 TB of RAM, "Now that's a lotta RAM-age"
	while (ram <= 131072) {
		if (ns.getPurchasedServerUpgradeCost(name + num, ram) < ns.getServerMoneyAvailable('home')) {
			ns.upgradePurchasedServer(name + num, ram);
			ns.clearLog();
			ns.print(name + num, ' Upgd to ', ns.formatRam(ram));
			num++;
			if (num < 26) {
				ns.print('Next Upg: ', name + num, ' $', ns.formatNumber(ns.getPurchasedServerUpgradeCost(name + num, ram)));
			}
		}
		if (num == 26) {
			num = ('1');
			ram *= 2;

			ns.print('Next Upg: ', name + num, ' $', ns.formatNumber(ns.getPurchasedServerUpgradeCost(name + num, ram)));
		}

		await ns.sleep(1000);  //Sleep to prevent script crashing
	}
	//Completion messages in console window
	ns.resizeTail(320, 240);
	ns.print('Purchased 25 servers');
	ns.print(name, '1 - ', name, '25');
	ns.print('Hacking toolkit loaded to all servers');
	ns.print('Go forth and ../ the planet');
}
