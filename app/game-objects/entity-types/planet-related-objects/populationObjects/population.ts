import Species from "./species";
import Planet from "../../../../planet";
import Team from "../../../../team";

export default class Population {
    private maxHealth = 100;
    private minHealth = -100;
    private allegiances: number[];

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

    public increaseAllegianceForPlayer(team: Team) {
        
    }
}