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
            name: '@todo',
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
            name: '@todo',
            description: '@todo',
            price: 10000,
        }));
        this.items.push(new Item({
            key: 'bio',
            name: '@todo',
            description: '@todo',
            price: 10000,
        }));
    }
}

export class Item {
    public key: string;
    public name: string;
    public description: string;
    public price: string;
    constructor(
        props: object,
    ) {
        for (let key in props) {
            this[key] = props[key];
        }
    }
}
