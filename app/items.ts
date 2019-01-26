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
            price: 50,
        }));
        this.items.push(new Item({
            key: 'mine',
            name: 'Proximity Fused Plasma Mine',
            icon: 'assets/icon-mine.png',
            description: '@todo',
            price: 1000,
        }));
        this.items.push(new Item({
            key: 'hot-torpedo',
            name: 'Hot Plasma Missile',
            icon: 'assets/icon-hot-torpedo.png',
            description: 'This is a variation of the standard torpedo, but packs four times the punch. Fits all standard weapons racks.',
            price: 1000,
        }));
        this.items.push(new Item({
            key: 'nuke',
            name: 'Neutron Bomb',
            icon: 'assets/icon-nuclear.png',
            description: '@todo',
            price: 10000,
        }));
        this.items.push(new Item({
            key: 'bio',
            name: 'Plague Bomb',
            icon: 'assets/icon-bio.png',
            description: '@todo',
            price: 10000,
        }));
        this.items.push(new Item({
            key: 'cargo-pod',
            name: 'Cargo Pod',
            icon: 'assets/cargo.png',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'energy-pod',
            name: 'Energy Pod',
            icon: 'assets/energy.png',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'charge-pod',
            name: 'Charge Pod',
            icon: 'assets/charge.png',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'shield',
            name: 'Shield',
            icon: 'assets/shield.png',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'cloak',
            name: 'Cloak',
            icon: 'assets/icon-cloak.png',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'disrupter',
            name: 'Disrupter',
            icon: 'assets/icon-sun.png',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'warp-drive',
            name: 'Warp Drive',
            icon: 'assets/icon-warp.png',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'anti-bio',
            name: 'Anti Plague Sterilization Beam',
            icon: 'assets/icon-anti-bio.png',
            description: '@todo',
            price: 100,
        }));
    }
}

export class Item {
    public key: string;
    public name: string;
    public icon: string;
    public description: string;
    public price: number;
    constructor(
        props: object,
    ) {
        for (let key in props) {
            this[key] = props[key];
        }
    }
}
