export async function main(ns) {
    ns.print("Starting script here.");
    await ns.hack("foodnstuff");
    ns.print(ns.args);
}