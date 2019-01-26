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

        if (this.health + healthChange > this.maxHealth ) {
            healthChange = this.maxHealth - this.health;
        } else if (this.health + healthChange < this.minHealth) {
            healthChange = this.minHealth - this.health;
        }

        this.health += healthChange;
    }

    public calculatePopulationChange(maxPopulation: number) {
        if(this.species === undefined || this.species === null) {
            return;
        }

        let populationChange = Math.pow(this.quantity * this.species.populationGrowthRate * (this.health/100), 0.9)
        
        if (this.quantity + populationChange > maxPopulation) {
            populationChange = maxPopulation - this.quantity;
        }
        
        this.quantity += populationChange
    }

    public calculatePopulationConsumption(): number {
        if(this.species == null || this.quantity == 0) {
            return 0;
        }

        let populationConsumption = this.quantity * this.species.populationConsumption;

        return populationConsumption;
    }

    public getAllegianceForPlayer(team: Team) {
        return this.allegiances[team.id];
    }

    public increaseAllegianceForPlayer(team: Team, money: number) {
        let numPlayersEncountered = 0;
        if(this.allegiances[team.id] === undefined || this.allegiances[team.id] === null) {
            this.allegiances[team.id] = 50
        }

        numPlayersEncountered = Object.keys(this.allegiances).length;
        numPlayersEncountered--;

        let returnOnInvestment = money / 1000;
        returnOnInvestment /= numPlayersEncountered;

        this.allegiances[team.id] += returnOnInvestment;

        for(const key of Object.keys(this.allegiances)) {
            if(key !== team.id.toString()) {
                this.allegiances[key] -= returnOnInvestment;
            }
        }
    }
}