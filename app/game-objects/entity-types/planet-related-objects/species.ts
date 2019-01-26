import PlanetType from "./planetType";

export default class Species {
    constructor(
        public speciesName: string,
        public imageLocation: string,
        public populationGrowthRate: number,
        public populationConsumption: number,
        public foodConsumption: number,
        public prefferedPlanetType: PlanetType
    ) {

    }
}