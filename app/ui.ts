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

    private planetName: HTMLElement;
    private planetInhabitance: HTMLElement;
    private planetPopulation: HTMLElement;
    private planetSickness: HTMLElement;
    private planetInfrastructure: HTMLElement;
    private planetResource: HTMLElement;

    constructor(
        private scene: DefaultScene,
    ) {
        this.modalWrapper = document.getElementById('modal-wrapper');

        this.shipEnergy = document.getElementById('ship-energy');
        this.shipCharge = document.getElementById('ship-charge');
        this.shipCargo = document.getElementById('ship-cargo');

        this.planetName = document.getElementById('planet-name');
        this.planetInhabitance = document.getElementById('planet-inhabitance');
        this.planetPopulation = document.getElementById('planet-population');

        this.planetSickness = document.getElementById('planet-sickness');
        this.planetInfrastructure = document.getElementById('planet-infrastructure');
        this.planetResource = document.getElementById('planet-resource');

        document.getElementById('cancel-modal').addEventListener('click', () => {
            this.hide(this.modalWrapper);
        });

        document.getElementById('sell-all').addEventListener('click', () => {
            this.ship.sell();
            this.hide(this.modalWrapper);
        });

        document.getElementById('sell-1000').addEventListener('click', () => {
            this.ship.sell(1);
            this.hide(this.modalWrapper);
        });
    }

    public showModalSell() {
        if (this.ship.cargo > 1) {
            this.show(document.getElementById('sell-1000-tons'));
        } else {
            this.hide(document.getElementById('sell-1000-tons'));
        }
        document.getElementById('sell-all-tons').innerText = this.numberWithCommas(this.ship.cargo * 1000, 0);
        this.showModal('modal-sell');
    }

    private numberWithCommas(n: number, dp: number) {
        var parts = n.toFixed(dp).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
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
        el.style.display = 'none';
        return el;
    }

    public update() {
        if (this.ship) {
            this.shipEnergy.innerText = this.ship.energy.toFixed(2);
            this.shipCharge.innerText = this.ship.charge.toFixed(2);
            this.shipCargo.innerText = this.ship.cargo.toFixed(2);
            if (this.ship.stoppedOnPlanet) {
                this.planetName.innerText = this.ship.stoppedOnPlanet.name;
                this.planetInhabitance.innerText = 'Uninhabited';
                this.planetPopulation.innerText = this.ship.stoppedOnPlanet.population.toFixed(0);
                this.planetSickness.innerText = '213'; // @todo
                this.planetInfrastructure.innerText = '213'; // @todo
                this.planetResource.innerText = this.ship.stoppedOnPlanet.resources.toFixed(2);
            }
        }
    }
}
