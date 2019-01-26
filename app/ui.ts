import DefaultScene from "./scenes/default";
import Entity from "./entity";
import Ship from "./ship";

const $ = (selector) => {
    return new Element(<any>document.querySelectorAll(selector));
};

const e = (tagName) => {
    return new Element([document.createElement(tagName)]);
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
        return this;
    }

    hide() {
        for (const el of this.elements) {
            el.style.display = 'none';
        }
        return this;
    }

    addEventListener(event: string, callback: (event: any) => void) {
        for (const el of this.elements) {
            el.addEventListener(event, callback);
        }
        return this;
    }

    text(text: string) {
        for (const el of this.elements) {
            el.innerText = text;
        }
        return this;
    }

    is(element: HTMLElement) {
        for (const el of this.elements) {
            if (el == element) {
                return true;
            }
        }
        return false;
    }

    attr(attrs) {
        for (const el of this.elements) {
            for (const key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
        }
        return this;
    }

    style(styles) {
        for (const el of this.elements) {
            for (const key in styles) {
                el.style[key] = styles[key];
            }
        }
        return this;
    }

    append(child: Element) {
        for (const el of this.elements) {
            el.appendChild(child.elements[0]);
            break;
        }
        return this;
    }
}

export default class UI implements Entity {
    slowUpdate() {
    }

    public static width = 600;
    public static height = 600;

    private modalWrapper: Element;

    public playerShip: Ship = null;
    public enemyShip0: Ship = null;
    public enemyShip1: Ship = null;
    public enemyShip2: Ship = null;

    private shipEnergyBar: Element;
    private shipEnergyPods: Element;
    private shipChargeBar: Element;
    private shipChargePods: Element;
    private shipCargoBar: Element;
    private shipCargoPods: Element;
    private shipShields: Element;
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

    private minimapShip1: Element;
    private minimapShip2: Element;
    private minimapShip3: Element;
    private minimapShip4: Element;

    private currentItem = 0;

    constructor(
        private scene: DefaultScene,
    ) {
        this.modalWrapper = $('#modal-wrapper');

        this.shipEnergyBar = $('#energy-bar');
        this.shipEnergyPods = $('#energy-pods');
        this.shipChargeBar = $('#charge-bar');
        this.shipChargePods = $('#charge-pods');
        this.shipCargoBar = $('#cargo-bar');
        this.shipCargoPods = $('#cargo-pods');
        this.shipShields = $('#ship-shields');
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

        this.minimapShip1 = $('#minimap-ship-1');
        this.minimapShip2 = $('#minimap-ship-2');
        this.minimapShip3 = $('#minimap-ship-3');
        this.minimapShip4 = $('#minimap-ship-4');

        $('.cancel-modal').addEventListener('click', () => {
            this.hideModals();
        });

        $('#sell-all').addEventListener('click', () => {
            this.playerShip.sell();
            this.modalWrapper.hide();
        });

        $('#sell-1000').addEventListener('click', () => {
            this.playerShip.sell(1);
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
            if (this.playerShip && this.playerShip.stoppedOnPlanet && this.playerShip.stoppedOnPlanet.canInvest) {
                this.showModal('modal-invest');
            }
        });

        $('#open-buy').addEventListener('click', () => {
            if (this.playerShip && this.playerShip.stoppedOnPlanet && this.playerShip.stoppedOnPlanet.canSell) {
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

        $('#modal-invest-mining').addEventListener('click', () => {
            if(this.ship === undefined || this.ship === null) {
                return;
            }

            let planet = this.ship.stoppedOnPlanet;
            if(planet
                && planet.canInvest(this.ship.team)
                && planet.remainingInvestmentInMining() > 0) {

            }
        })

        $('#buy-1').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.playerShip.buyItem(item, 1);
            // @TODO subtract money
        });

        $('#buy-10').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.playerShip.buyItem(item, 10);
            // @TODO subtract money
        });

        $('#buy-100').addEventListener('click', () => {
            const item = this.scene.items.items[this.currentItem];
            this.playerShip.buyItem(item, 100);
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
        const tons = Math.round(this.playerShip.cargo * 1000);
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

    private getBarAmount(amount, max) {
        if (amount == max) {
            return 100;
        }
        return ((amount % 1) * 100).toFixed(2);
    }

    private getPodCount(amount, max) {
        if (amount >= 5) {
            return 5;
        } else if (amount >= 4 && amount < max) {
            return 4;
        } else if (amount >= 3 && amount < max) {
            return 3;
        } else if (amount >= 2 && amount < max) {
            return 2;
        } else if (amount >= 1 && amount < max) {
            return 1;
        }
        return 0;
    }

    public update() {
        if (this.playerShip) {
            this.shipEnergyBar.style({
                width: this.getBarAmount(this.playerShip.energy, this.playerShip.maxEnergy) + '%',
            });
            this.shipEnergyPods.attr({
                class: 'pods pods-' + this.getPodCount(this.playerShip.energy, this.playerShip.maxEnergy) + ' pods-max-' + Math.max(0, Math.floor(this.playerShip.maxEnergy - 1)),
            });
            
            this.shipChargeBar.style({
                width: this.getBarAmount(this.playerShip.charge, this.playerShip.maxCharge) + '%',
            });
            this.shipChargePods.attr({
                class: 'pods pods-' + this.getPodCount(this.playerShip.charge, this.playerShip.maxCharge) + ' pods-max-' + Math.max(0, Math.floor(this.playerShip.maxCharge - 1)),
            });

            this.shipCargoBar.style({
                width: this.getBarAmount(this.playerShip.cargo, this.playerShip.maxCargo) + '%',
            });
            this.shipCargoPods.attr({
                class: 'pods pods-' + this.getPodCount(this.playerShip.cargo, this.playerShip.maxCargo) + ' pods-max-' + Math.max(0, Math.floor(this.playerShip.maxCargo - 1)),
            });

            this.shipShields.text(this.numberWithCommas(this.playerShip.maxShield, 0));
            this.shipMoney.text(this.numberWithCommas(this.playerShip.money, 0));

            this.itemTorpedoCount.text(this.numberWithCommas(this.playerShip.items['torpedo'].amount, 0));
            this.itemHotTorpedoCount.text(this.numberWithCommas(this.playerShip.items['hot-torpedo'].amount, 0));
            this.itemMineCount.text(this.numberWithCommas(this.playerShip.items['mine'].amount, 0));
            this.itemNukeCount.text(this.numberWithCommas(this.playerShip.items['nuke'].amount, 0));
            this.itemBioCount.text(this.numberWithCommas(this.playerShip.items['bio'].amount, 0));

            if (this.playerShip.stoppedOnPlanet) {
                this.planetName.text(this.playerShip.stoppedOnPlanet.name);
                this.planetInhabitance.text('Uninhabited');
                this.planetPopulation.text(this.numberWithCommas(this.playerShip.stoppedOnPlanet.getTotalPopulationConsumed(), 0));
                this.planetSickness.text('213'); // @todo
                this.planetInfrastructure.text('213'); // @todo
                this.planetResource.text(this.numberWithCommas(this.playerShip.stoppedOnPlanet.resources, 2));
            }

            this.minimapShip1.style({
                left: (this.playerShip.x / this.scene.level.width * 100) + '%',
                top: (this.playerShip.y / this.scene.level.height * 100) + '%',
            });
            this.minimapShip2.style({
                left: (this.enemyShip0.x / this.scene.level.width * 100) + '%',
                top: (this.enemyShip0.y / this.scene.level.height * 100) + '%',
            });
            this.minimapShip3.style({
                left: (this.enemyShip1.x / this.scene.level.width * 100) + '%',
                top: (this.enemyShip1.y / this.scene.level.height * 100) + '%',
            });
            this.minimapShip4.style({
                left: (this.enemyShip2.x / this.scene.level.width * 100) + '%',
                top: (this.enemyShip2.y / this.scene.level.height * 100) + '%',
            });
        }
    }

    public drawMiniMap() {
        const minimap = $('#minimap');
        for (const planet of this.scene.level.planets) {
            const xp = planet.x / this.scene.level.width;
            const yp = planet.y / this.scene.level.height;
            minimap.append(e('div').attr({
                class: 'minimap-planet',
            }).style({
                left: (xp * 100) + '%',
                top: (yp * 100) + '%',
                backgroundColor: planet.getTotalPopulationConsumed() > 0 ? '#00ff00' : '#ddd',
            }));
        }
    }
}
