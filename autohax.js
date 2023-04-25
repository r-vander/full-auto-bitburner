/** @param {NS} ns */
export async function main(ns) {
    // Declare our variables because JS is dumb unlike Python
    let server = ns.args[0];
    let t = ('1');
    let th = ('1');
    let host = ns.getHostname();

    //Some stuff to make everything look clean and tidy
    ns.disableLog("ALL");
    ns.clearLog();
    ns.scriptKill('/auto/weak.js', host);
    ns.scriptKill('/auto/hack.js', host);
    ns.scriptKill('/auto/grow.js', host);
    ns.tail();
    await ns.sleep(200);
    ns.resizeTail(280, 198);

    //Crack the server open first
    ns.print('Cracking server - ', server)
    ns.brutessh(server);
    ns.ftpcrack(server);
    ns.httpworm(server);
    ns.relaysmtp(server);
    ns.sqlinject(server);
    ns.nuke(server);

    //The big loop for full automated hax
    while (true) {
        //Just incase script was restarted, kill other instances of hack/weaken/grow scripts to prevent dumb error messages
        ns.scriptKill('/auto/weak.js', host);
        ns.scriptKill('/auto/hack.js', host);
        ns.scriptKill('/auto/grow.js', host);

        //Calculates number of threads to max out available ram usage for each function called
        t = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75));
        th = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.7));


        // Sleep for 1 sec, to prevent crashing game
        await ns.sleep(1000);

        //Beat the server's defenses down a bit
        ns.scriptKill('/auto/grow.js', host);
        ns.scriptKill('/auto/weak.js', host);
        ns.scriptKill('/auto/hack.js', host);
        t = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75));
        th = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.7));
        while (ns.getServerSecurityLevel(server) > ns.getServerMinSecurityLevel(server) * 2) {
            ns.clearLog();
            ns.run('/auto/weak.js', t, server);
            ns.print('Weakening...', '  ', ns.getHostname());
            ns.print(server);
            ns.print('Threads - ', t);
            ns.print('Security Lvl ', ns.formatNumber(ns.getServerSecurityLevel(server)));
            ns.print('Min Sec ', ns.formatNumber(ns.getServerMinSecurityLevel(server)));
            ns.print('Money Available: $', ns.formatNumber(ns.getServerMoneyAvailable(server)));
            ns.print('Max Money: $', ns.formatNumber(ns.getServerMaxMoney(server)));
            await ns.sleep(2000);
        }

        //Kill other scripts and prepare variables for grow ops
        ns.scriptKill('/auto/grow.js', host);
        ns.scriptKill('/auto/weak.js', host);
        ns.scriptKill('/auto/hack.js', host);
        t = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75));
        th = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.7));

        //If the money is less than max AND security isn't more than 5 above minimum,
        //Let's spoof some digital currency into the server, for mad profits yo
        while (ns.getServerMoneyAvailable(server) < ns.getServerMaxMoney(server) && ns.getServerSecurityLevel(server) < (ns.getServerMinSecurityLevel(server) + 5)) {
            ns.clearLog();
            ns.run('/auto/grow.js', t, server);
            ns.print('Growing...', '  ', ns.getHostname());
            ns.print(server);
            ns.print('Threads - ', t);
            ns.print('Security Lvl ', ns.formatNumber(ns.getServerSecurityLevel(server)));
            ns.print('Min Sec ', ns.formatNumber(ns.getServerMinSecurityLevel(server)));
            ns.print('Money Available: $', ns.formatNumber(ns.getServerMoneyAvailable(server)));
            ns.print('Max Money: $', ns.formatNumber(ns.getServerMaxMoney(server)));
            await ns.sleep(2000);
        }

        //Weaken again to offset the artificial inflation
        ns.scriptKill('/auto/grow.js', host);
        ns.scriptKill('/auto/weak.js', host);
        ns.scriptKill('/auto/hack.js', host);
        t = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75));
        th = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.7));
        while (ns.getServerSecurityLevel(server) > ns.getServerMinSecurityLevel(server) * 1.25) {
            ns.clearLog();
            ns.run('/auto/weak.js', t, server);
            ns.print('Weakening...', '  ', ns.getHostname());
            ns.print(server);
            ns.print('Threads - ', t);
            ns.print('Security Lvl ', ns.formatNumber(ns.getServerSecurityLevel(server)));
            ns.print('Min Sec ', ns.formatNumber(ns.getServerMinSecurityLevel(server)));
            ns.print('Money Available: $', ns.formatNumber(ns.getServerMoneyAvailable(server)));
            ns.print('Max Money: $', ns.formatNumber(ns.getServerMaxMoney(server)));
            await ns.sleep(2000);
        }

        //Now that the server is full o' dough and has gameboy level security, hack the s#!t outta that thing ;)
        ns.scriptKill('/auto/grow.js', host);
        ns.scriptKill('/auto/weak.js', host);
        ns.scriptKill('/auto/hack.js', host);
        t = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75));
        th = (Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.7));
        if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server)) {
            if (ns.getServerMoneyAvailable(server) > ns.getServerMaxMoney(server) * 0.95) {
                while (ns.getServerMoneyAvailable(server) > ns.getServerMaxMoney(server) * 0.03 && ns.getServerSecurityLevel(server) < (ns.getServerMinSecurityLevel(server) + 5)) {
                    ns.clearLog();
                    ns.run('/auto/hack.js', th, server);
                    ns.print('Hacking... :)', '  ', ns.getHostname());
                    ns.print(server);
                    ns.print('Threads - ', th);
                    ns.print('Security Lvl ', ns.formatNumber(ns.getServerSecurityLevel(server)));
                    ns.print('Min Sec ', ns.formatNumber(ns.getServerMinSecurityLevel(server)));
                    ns.print('Money Available: $', ns.formatNumber(ns.getServerMoneyAvailable(server)));
                    ns.print('Max Money: $', ns.formatNumber(ns.getServerMaxMoney(server)));
                    await ns.sleep(2000);
                }
            }
        }

        //Just incase we try to hack stuff we aren't smart enough to hack yet, prevents stupid error messages filling screen
        //Allows script to weaken and grow server then hack it when we reach high enough Hack lvl
        else {
            ns.clearLog();
            ns.print('Hack skill too low.');
            ns.print('Hack skill req: ', ns.getServerRequiredHackingLevel(server), '  :(');
            ns.print('Try going to university');
        }
    }
}
