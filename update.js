/** @param {NS} ns */
export async function main(ns) {
	let name = (ns.args[0]);
	let num = ('1')
	const files = ["/auto/hack.js", "/auto/weak.js", "/auto/grow.js", "/auto/autohax.js"];

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

	//Push updated hacktools to all purchased servers
	while (num <= 25) {
		ns.scp(files, name + num, "home");
		ns.clearLog();
		ns.print('Update hacktools on ', name + num);
		num++;
		await ns.sleep(1000);  //Sleep to prevent script crashing
	}

}
