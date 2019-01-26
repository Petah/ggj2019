import DefaultScene from "./scenes/default";

export default class Items {
    public items: Item[] = [];
    constructor(
        private scene: DefaultScene,
    ) {
        this.items.push(new Item({
            key: 'torpedo',
            name: 'Phased Matter Interaction Torpedo',
            description: 'Only the finest plasma by-products are used in the creation of this industry standard product. Licence by KillTronics Inc.',
            price: 50,
        }));
        this.items.push(new Item({
            key: 'mine',
            name: 'Proximity Fused Plasma Mine',
            description: '@todo',
            price: 1000,
        }));
        this.items.push(new Item({
            key: 'hot-torpedo',
            name: 'Hot Plasma Missile',
            description: 'This is a variation of the standard torpedo, but packs four times the punch. Fits all standard weapons racks.',
            price: 1000,
        }));
        this.items.push(new Item({
            key: 'nuke',
            name: 'Neutron Bomb',
            description: '@todo',
            price: 10000,
        }));
        this.items.push(new Item({
            key: 'bio',
            name: 'Plague Bomb',
            description: '@todo',
            price: 10000,
        }));
        this.items.push(new Item({
            key: 'cargo-pod',
            name: 'Cargo Pod',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'energy-pod',
            name: 'Energy Pod',
            description: '@todo',
            price: 100,
        }));
        this.items.push(new Item({
            key: 'charge-pod',
            name: 'Charge Pod',
            description: '@todo',
            price: 100,
        }));
    }
}

export class Item {
    public key: string;
    public name: string;
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
