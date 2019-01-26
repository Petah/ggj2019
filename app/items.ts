import DefaultScene from "./scenes/default";

export default class Items {
    public items: Item[] = [];
    constructor(
        private scene: DefaultScene,
    ) {
        this.items.push(new Item({
            key: 'torpedo',
            name: 'Phased Matter Interaction Torpedo',
            icon: 'assets/icon-torpedo.png',
            description: 'Only the finest plasma by-products are used in the creation of this industry standard product. Licence by KillTronics Inc.',
            price: 110,
            damage: 0.24,
            fireCost: 0.05,
        }));
        this.items.push(new Item({
            key: 'mine',
            name: 'Proximity Fused Plasma Mine',
            icon: 'assets/icon-mine.png',
            description: 'Emits a large energy pulse when approached by hull of passing vessel. Once armed, is lethal to friend and foe.',
            price: 230,
            damage: 0.33,
            fireCost: 0.08,
        }));
        this.items.push(new Item({
            key: 'hot-torpedo',
            name: 'Hot Plasma Missile',
            icon: 'assets/icon-hot-torpedo.png',
            description: 'This is a variation of the standard torpedo, but packs four times the punch. Fits all standard weapons racks.',
            price: 1000,
            damage: 0.42,
            fireCost: 0.12,
        }));
        this.items.push(new Item({
            key: 'nuke',
            name: 'Neutron Bomb',
            icon: 'assets/icon-nuclear.png',
            description: 'This convenient multi-teraton package is guaranteed to destroy a great deal of living matter on a planet. It is also an effective plague sterilization technique.',
            price: 100000,
            damage: 0.95,
            fireCost: 0.65,
        }));
        this.items.push(new Item({
            key: 'bio',
            name: 'Plague Bomb',
            icon: 'assets/icon-bio.png',
            description: 'The galactic council has restricted this highly toxic and contagious anti-planetary weapon from sale to the general public. However, a few of them are registered under a pre-existing "grandfathered" clause and can be purchased here.',
            price: 200000,
        }));
        this.items.push(new Item({
            key: 'cargo-pod',
            name: 'Cargo Pod',
            icon: 'assets/cargo.png',
            description: 'These fine Gryllian cargo pods holder of 1000 metric tons or raw mass. Each comes with a matter transfer coil which beams up ore directly from a planets surface. Note: shields are lowered during transfer.',
            // @todo disable shields when transfering 
            price: 22350,
        }));
        this.items.push(new Item({
            key: 'energy-pod',
            name: 'Energy Pod',
            icon: 'assets/energy.png',
            description: 'For long distance trips across the galaxy, be sure to carry plenty of these. Each pod can extend your range by 15 parsecs before refueling is necessary. Comes with a free stellar conversion unit to support one additional tick of velocity with out fuel drain.',
            price: 37500,
        }));
        this.items.push(new Item({
            key: 'charge-pod',
            name: 'Charge Pod',
            icon: 'assets/charge.png',
            description: 'Electron devices like shields and phased weapons require plenty of electron volts. Your bi-chron engine accelerators make the potential, but where can you store your surplus? Pick up a couple of these today for stronger lasers and longer leaps.',
            price: 12500,
        }));
        this.items.push(new Item({
            key: 'shield',
            name: 'Shield',
            icon: 'assets/shield.png',
            description: '@todo',
            price: 25000,
        }));
        this.items.push(new Item({
            key: 'cloak',
            name: 'Cloak',
            icon: 'assets/icon-cloak.png',
            description: '@todo',
            price: 53000,
        }));
        this.items.push(new Item({
            key: 'disrupter',
            name: 'Disrupter',
            icon: 'assets/icon-sun.png',
            description: '@todo',
            price: 147000,
        }));
        this.items.push(new Item({
            key: 'warp-drive',
            name: 'Warp Drive',
            icon: 'assets/icon-warp.png',
            description: '@todo',
            price: 1500000,
        }));
        this.items.push(new Item({
            key: 'anti-bio',
            name: 'Anti Plague Sterilization Beam',
            icon: 'assets/icon-anti-bio.png',
            description: '@todo',
            price: 27000,
        }));
    }
}

export class Item {
    public key: string;
    public name: string;
    public icon: string;
    public description: string;
    public price: number;
    public damage: number;
    public fireCost: number;
    constructor(
        props: object,
    ) {
        for (let key in props) {
            this[key] = props[key];
        }
    }
}
