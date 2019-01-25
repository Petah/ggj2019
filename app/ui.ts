import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";

export default class UI implements Entity {

    public static width = 600;
    public static height = 600;

    private modalWrapper: HTMLElement;

    public ship: Ship = null;
    private shipEnergy: HTMLElement;
    private shipCharge: HTMLElement;
    private shipCargo: HTMLElement;

    constructor(
        private scene: DefaultScene,
    ) {
        this.modalWrapper = document.getElementById('modal-wrapper');
        this.shipEnergy = document.getElementById('ship-energy');
        this.shipCharge = document.getElementById('ship-charge');
        this.shipCargo = document.getElementById('ship-cargo');
    }

    public showModal(id) {
        const el = document.getElementById(id);
        this.show(this.modalWrapper);
        this.show(el);
    }

    private show(el: HTMLElement): HTMLElement {
        el.style.display = '';
        return el;
    }

    private hide(el: HTMLElement): HTMLElement {
        el.style.display = '';
        return el;
    }

    public update() {
        if (this.ship) {
            this.shipCargo.innerText = this.ship.cargo.toString();
        }
    }
}
