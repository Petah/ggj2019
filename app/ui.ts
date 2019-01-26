import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";

const $ = (selector) => {
    return new Element(<any>document.querySelectorAll(selector));
};

class Element {
    constructor(
        public elements: HTMLElement[]
    ) {
    }

    show() {
        for (const el of this.elements) {
            el.style.display = '';
        }
    }

    hide() {
        for (const el of this.elements) {
            el.style.display = 'none';
        }
    }

    addEventListener(event: string, callback: (event: any) => void) {
        for (const el of this.elements) {
            el.addEventListener(event, callback);
        }
    }

    text(text: string) {
        for (const el of this.elements) {
            el.innerText = text;
        }
    }

    is(element: HTMLElement) {
        for (const el of this.elements) {
            if (el == element) {
                return true;
            }
        }
        return false;
    }
}

export default class UI implements Entity {

    public static width = 600;
    public static height = 600;

    private modalWrapper: Element;

    public ship: Ship = null;
    private shipEnergy: Element;
    private shipEnergyMax: Element;
    private shipCharge: Element;
    private shipChargeMax: Element;
    private shipCargo: Element;
    private shipCargoMax: Element;
    private shipMoney: Element;

    private itemTorpedoCount: Element;
    private itemHotTorpedoCount: Element;
    private itemMineCount: Element;
    private itemNukeCount: Element;
    private itemBioCount: Element;

    private planetName: Element;
    private planetInhabitance: Element;
    private planetPopulation: Element;
    private planetSickness: Element;
    private planetInfrastructure: Element;
    private planetResource: Element;

    private currentItem = 0;

    constructor(
        private scene: DefaultScene,
    ) {
        this.modalWrapper = $('#modal-wrapper');

        this.shipEnergy = $('#ship-energy');
        this.shipEnergyMax = $('#ship-energy-max');
        this.shipCharge = $('#ship-charge');
        this.shipChargeMax = $('#ship-charge-max');
        this.shipCargo = $('#ship-cargo');
        this.shipCargoMax = $('#ship-cargo-max');
        this.shipMoney = $('#ship-money');

        this.itemTorpedoCount = $('#item-torpedo-count');
        this.itemHotTorpedoCount = $('#item-hot-torpedo-count');
        this.itemMineCount = $('#item-mine-count');
        this.itemNukeCount = $('#item-nuke-count');
        this.itemBioCount = $('#item-bio-count');

        this.planetName = $('#planet-name');
        this.planetInhabitance = $('#planet-inhabitance');
        this.planetPopulation = $('#planet-population');

        this.planetSickness = $('#planet-sickness');
        this.planetInfrastructure = $('#planet-infrastructure');
        this.planetResource = $('#planet-resource');

        $('.cancel-modal').addEventListener('click', () => {
            console.log('cancel-modal');
            this.hideModals();
        });

        $('#sell-all').addEventListener('click', () => {
            this.ship.sell();
            this.modalWrapper.hide();
        });

        $('#sell-1000').addEventListener('click', () => {
            this.ship.sell(1);
            this.modalWrapper.hide();
        });

        $('#mine').addEventListener('click', () => {
        });

        $('#populate').addEventListener('click', () => {
        });

        $('#modal-wrapper').addEventListener('click', (event) => {
            if (this.modalWrapper.is(event.target)) {
                this.hideModals();
            }
        });

        $('#open-invest').addEventListener('click', () => {
            if (this.ship && this.ship.stoppedOnPlanet && this.ship.stoppedOnPlanet.canInvest) {
                this.showModal('modal-invest');
            }
        });

        $('#open-buy').addEventListener('click', () => {
            if (this.ship && this.ship.stoppedOnPlanet && this.ship.stoppedOnPlanet.canSell) {
                this.showItem(this.currentItem);
                this.showModal('modal-buy');
            }
        });

        $('#next-item').addEventListener('click', () => {
            this.currentItem++;
            if (this.currentItem >= this.scene.items.items.length) {
                this.currentItem = 0;
            }
            this.showItem(this.currentItem);
        });

        $('#prev-item').addEventListener('click', () => {
            this.currentItem--;
            if (this.currentItem < 0) {
                this.currentItem = this.scene.items.items.length - 1;
            }
            this.showItem(this.currentItem);
        });

        $('#buy-1').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.ship.buyItem(item, 1);
            // @TODO subtract money
        });

        $('#buy-10').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.ship.buyItem(item, 10);
            // @TODO subtract money
        });

        $('#buy-100').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.ship.buyItem(item, 100);
            // @TODO subtract money
        });
    }

    private showItem(itemNumber) {
        const item = this.scene.items.items[itemNumber];
        $('#item-name').text(item.name);
        $('#item-description').text(item.description);
        $('#item-price').text(this.numberWithCommas(item.price, 0));
        $('#item-quantity').text('100');
    }

    public showModalSell() {
        const tons = Math.round(this.ship.cargo * 1000);
        if (tons > 1000) {
            $('#sell-1000-tons').show();
        } else {
            $('#sell-1000-tons').hide();
        }
        $('#sell-all-tons').text(this.numberWithCommas(tons, 0));
        this.showModal('modal-sell');
    }

    private numberWithCommas(n: number, dp: number) {
        var parts = n.toFixed(dp).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    public showModal(id) {
        this.hideModals();
        const el = $('#' + id);
        this.modalWrapper.show();
        el.show();
    }

    private hideModals() {
        this.modalWrapper.hide();
        $('#modal-sell').hide();
        $('#modal-buy').hide();
        $('#modal-invest').hide();
    }

    public update() {
        if (this.ship) {
            this.shipEnergy.text(this.numberWithCommas(this.ship.energy, 2));
            this.shipEnergyMax.text(this.numberWithCommas(this.ship.maxEnergy, 2));
            this.shipCharge.text(this.numberWithCommas(this.ship.charge, 2));
            this.shipChargeMax.text(this.numberWithCommas(this.ship.maxCharge, 2));
            this.shipCargo.text(this.numberWithCommas(this.ship.cargo, 2));
            this.shipCargoMax.text(this.numberWithCommas(this.ship.maxCargo, 2));

            this.shipMoney.text(this.numberWithCommas(this.ship.money, 0));

            this.itemTorpedoCount.text(this.numberWithCommas(this.ship.items['torpedo'].amount, 0));
            this.itemHotTorpedoCount.text(this.numberWithCommas(this.ship.items['hot-torpedo'].amount, 0));
            this.itemMineCount.text(this.numberWithCommas(this.ship.items['mine'].amount, 0));
            this.itemNukeCount.text(this.numberWithCommas(this.ship.items['nuke'].amount, 0));
            this.itemBioCount.text(this.numberWithCommas(this.ship.items['bio'].amount, 0));

            if (this.ship.stoppedOnPlanet) {
                this.planetName.text(this.ship.stoppedOnPlanet.name);
                this.planetInhabitance.text('Uninhabited');
                this.planetPopulation.text(this.numberWithCommas(this.ship.stoppedOnPlanet.population, 0));
                this.planetSickness.text('213'); // @todo
                this.planetInfrastructure.text('213'); // @todo
                this.planetResource.text(this.numberWithCommas(this.ship.stoppedOnPlanet.resources, 2));
            }
        }
    }
}
