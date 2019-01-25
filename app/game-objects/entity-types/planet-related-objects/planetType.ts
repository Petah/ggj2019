export default class PlanetType {

    constructor(
        public typeName: string,
        public miningModifier: number,
        public maxMiningModifier: number,
        public spacePortModifier: number,
        public maxSpacePortModifier: number,
        public industryModifier: number,
        public maxIndustryModifier: number,
        public agricultureModifier: number,
        public maxAgricultureModifier: number,
        public defenceModifier: number,
        public maxDefenceModifier: number,
        public educationModifier: number,
        public maxEducationModifier: number,
        public infastructureModifier: number,
        public maxInfastrucutreModifier: number,
        public healthModifier: number,
        public maxHealthModifier: number,
        public populationGrowthModifier: number,
        public maxPopulationModifier: number
    ) {

    }
}