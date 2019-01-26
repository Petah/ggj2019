import Species from "./species";
import Planet from "../../../../planet";
import Team from "../../../../team";

interface AllegianceMap {
    [key: number]: number;
};

export default class Population {
    private maxHealth = 100;
    private minHealth = -100;
    private allegiances: AllegianceMap = {};

    constructor(
        public species: Species,
        public quantity: number,
        public health: number
    ) {

    }

    public calculateFoodConsumption(): number {
        return this.species.foodConsumption * this.quantity
    }

    public calculateHealthChangeDueToFood(foodAvailable: number) {
        let healthChange = foodAvailable / this.quantity;

        if (this.health + healthChange > this.maxHealth) {
            healthChange = this.maxHealth - this.health;
        } else if (this.health + healthChange < this.minHealth) {
            healthChange = this.minHealth - this.health;
        }

        this.health += healthChange;
    }

    public calculatePopulationChange(maxPopulation: number) {
        if (this.species === undefined || this.species === null) {
            return;
        }

        let populationChange = Math.pow(this.quantity * this.species.populationGrowthRate * (this.health / 100), 0.9)

        if (this.quantity + populationChange > maxPopulation) {
            populationChange = maxPopulation - this.quantity;
        }

        this.quantity += populationChange
    }

    public calculatePopulationConsumption(): number {
        if (this.species == null || this.quantity == 0) {
            return 0;
        }

        return this.quantity * this.species.populationConsumption;
    }

    public getAllegianceForPlayer(team: Team): number {
        if (this.calculatePopulationConsumption() <= 0) {
            return 0;
        }

        if (!this.allegiances[team.teamNumber]) {
            this.allegiances[team.teamNumber] = 50;
        }

        return this.allegiances[team.teamNumber];
    }

    public increaseAllegianceForPlayer(team: Team, money: number) {
        if (!this.allegiances[team.teamNumber]) {
            this.allegiances[team.teamNumber] = 50
        }

        let returnOnInvestment = money / 1000;
        returnOnInvestment /= Object.keys(this.allegiances).length - 1;

        this.allegiances[team.teamNumber] += returnOnInvestment;

        for (const key in this.allegiances) {
            if (key != team.teamNumber.toString()) {
                this.allegiances[key] -= returnOnInvestment;
            }
        }
    }

    public setAllegianceForTeam(team: Team, amount: number) {
        if (amount < 0 || amount > 100) {
            throw new Error('Invalid amount');
        }
        this.allegiances[team.teamNumber] = amount;
    }
}