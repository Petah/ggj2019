import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";

const $ = (selector) => {
    return document.getElementById(selector);
};

export default class UI implements Entity {

    public static width = 600;
    public static height = 600;

    private modalWrapper: HTMLElement;

    public ship: Ship = null;
    private shipEnergy: HTMLElement;
    private shipCharge: HTMLElement;
    private shipCargo: HTMLElement;
    private shipMoney: HTMLElement;

    private itemTorpedoCount: HTMLElement;
    private itemHotTorpedoCount: HTMLElement;
    private itemMineCount: HTMLElement;
    private itemNukeCount: HTMLElement;
    private itemBioCount: HTMLElement;

    private planetName: HTMLElement;
    private planetInhabitance: HTMLElement;
    private planetPopulation: HTMLElement;
    private planetSickness: HTMLElement;
    private planetInfrastructure: HTMLElement;
    private planetResource: HTMLElement;

    private currentItem = 0;

    constructor(
        private scene: DefaultScene,
    ) {
        this.modalWrapper = $('modal-wrapper');

        this.shipEnergy = $('ship-energy');
        this.shipCharge = $('ship-charge');
        this.shipCargo = $('ship-cargo');
        this.shipMoney = $('ship-money');

        this.itemTorpedoCount = $('item-torpedo-count');
        this.itemHotTorpedoCount = $('item-hot-torpedo-count');
        this.itemMineCount = $('item-mine-count');
        this.itemNukeCount = $('item-nuke-count');
        this.itemBioCount = $('item-bio-count');

        this.planetName = $('planet-name');
        this.planetInhabitance = $('planet-inhabitance');
        this.planetPopulation = $('planet-population');

        this.planetSickness = $('planet-sickness');
        this.planetInfrastructure = $('planet-infrastructure');
        this.planetResource = $('planet-resource');

        $('cancel-modal').addEventListener('click', () => {
            this.hideModals();
        });

        $('sell-all').addEventListener('click', () => {
            this.ship.sell();
            this.hide(this.modalWrapper);
        });

        $('sell-1000').addEventListener('click', () => {
            this.ship.sell(1);
            this.hide(this.modalWrapper);
        });

        $('mine').addEventListener('click', () => {
        });

        $('populate').addEventListener('click', () => {
        });

        $('modal-wrapper').addEventListener('click', (event) => {
            if (event.target == this.modalWrapper) {
                this.hideModals();
            }
        });

        $('open-invest').addEventListener('click', () => {
            if (this.ship && this.ship.stoppedOnPlanet && this.ship.stoppedOnPlanet.canInvest) {
                this.showModal('modal-invest');
            }
        });

        $('open-buy').addEventListener('click', () => {
            if (this.ship && this.ship.stoppedOnPlanet && this.ship.stoppedOnPlanet.canSell) {
                this.showItem(this.currentItem);
                this.showModal('modal-buy');
            }
        });

        $('next-item').addEventListener('click', () => {
            this.currentItem++;
            if (this.currentItem >= this.scene.items.items.length) {
                this.currentItem = 0;
            }
            this.showItem(this.currentItem);
        });

        $('prev-item').addEventListener('click', () => {
            this.currentItem--;
            if (this.currentItem < 0) {
                this.currentItem = this.scene.items.items.length - 1;
            }
            this.showItem(this.currentItem);
        });

        $('buy-1').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.ship.items[item.key].amount += 1;
            // @TODO subtract money
        });

        $('buy-10').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.ship.items[item.key].amount += 10;
            // @TODO subtract money
        });

        $('buy-100').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.ship.items[item.key].amount += 100;
            // @TODO subtract money
        });
    }

    private showItem(itemNumber) {
        const item = this.scene.items.items[itemNumber];
        $('item-name').innerText = item.name;
        $('item-description').innerText = item.description;
        $('item-price').innerText = item.price;
        $('item-quantity').innerText = '100';
    }

    public showModalSell() {
        if (this.ship.cargo > 1) {
            this.show($('sell-1000-tons'));
        } else {
            this.hide($('sell-1000-tons'));
        }
        $('sell-all-tons').innerText = this.numberWithCommas(this.ship.cargo * 1000, 0);
        this.showModal('modal-sell');
    }

    private numberWithCommas(n: number, dp: number) {
        var parts = n.toFixed(dp).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    public showModal(id) {
        this.hideModals();
        const el = $(id);
        this.show(this.modalWrapper);
        this.show(el);
    }

    private hideModals() {
        this.hide(this.modalWrapper);
        this.hide($('modal-sell'));
        this.hide($('modal-buy'));
        this.hide($('modal-invest'));
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
            this.shipEnergy.innerText = this.numberWithCommas(this.ship.energy, 2);
            this.shipCharge.innerText = this.numberWithCommas(this.ship.charge, 2);
            this.shipCargo.innerText = this.numberWithCommas(this.ship.cargo, 2);
            this.shipMoney.innerText = this.numberWithCommas(this.ship.money, 0);

            this.itemTorpedoCount.innerText = this.numberWithCommas(this.ship.items['torpedo'].amount, 0);
            this.itemHotTorpedoCount.innerText = this.numberWithCommas(this.ship.items['hot-torpedo'].amount, 0);
            this.itemMineCount.innerText = this.numberWithCommas(this.ship.items['mine'].amount, 0);
            this.itemNukeCount.innerText = this.numberWithCommas(this.ship.items['nuke'].amount, 0);
            this.itemBioCount.innerText = this.numberWithCommas(this.ship.items['bio'].amount, 0);

            if (this.ship.stoppedOnPlanet) {
                this.planetName.innerText = this.ship.stoppedOnPlanet.name;
                this.planetInhabitance.innerText = 'Uninhabited';
                this.planetPopulation.innerText = this.numberWithCommas(this.ship.stoppedOnPlanet.population, 0);
                this.planetSickness.innerText = '213'; // @todo
                this.planetInfrastructure.innerText = '213'; // @todo
                this.planetResource.innerText = this.numberWithCommas(this.ship.stoppedOnPlanet.resources, 2);
            }
        }
    }
}
