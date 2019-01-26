import PlanetType from "../planetType";

export default interface Species {
    speciesName: string,
    speciesNamePlural: string,
    speciesNameAdjective: string,
    imageLocation: string,
    populationGrowthRate: number,
    populationConsumption: number,
    foodConsumption: number,
    prefferedPlanetType: PlanetType
}