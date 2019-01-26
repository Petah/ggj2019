import PlanetType from "./planetType";

export default class PlanetTypeFactory {
    constructor() {

    }

    random(): PlanetType {
        var random = Math.floor(Math.random() * 4) + 1;
        var planetType: PlanetType;

        switch(random) {
            case 1: planetType = this.gasGiant(); break;
            case 2: planetType = this.volcanic(); break;
            case 3: planetType = this.continental(); break;
            case 4: planetType = this.jungle(); break;
            case 5: planetType = this.forest(); break;
            case 6: planetType = this.ice(); break;
            case 7: planetType = this.tundra(); break;
            case 8: planetType = this.ocean(); break;
            case 9: planetType = this.gaia(); break;
            default: planetType = this.gasGiant(); break;
        }
        return planetType;
    }

    gasGiant(): PlanetType {
        return new PlanetType(
            "Gas Giant",
            1.1, // miningModifier
            1.5, // maxMiningModifier
            0.1, // spacePortModifier
            0.1, // maxSpacePortModifier
            1.0, // industryModifier
            1.5, // maxIndustryModifier
            0.0, // agricultureModifier
            0.0, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.0, // educationModifier
            1.1, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            0.1, // populationGrowthModifier
            0.01 // maxPopulationModifier
        );
    }

    volcanic(): PlanetType {
        return new PlanetType(
            "Volcanic",
            1.4, // miningModifier
            2.0, // maxMiningModifier
            0.6, // spacePortModifier
            0.6, // maxSpacePortModifier
            1.1, // industryModifier
            1.5, // maxIndustryModifier
            0.05, // agricultureModifier
            0.1, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.2, // educationModifier
            1.0, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            0.1, // populationGrowthModifier
            0.01 // maxPopulationModifier
        );
    }

    continental(): PlanetType {
        return new PlanetType(
            "Continental",
            1.0, // miningModifier
            1.0, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            1.0, // industryModifier
            1.0, // maxIndustryModifier
            1.0, // agricultureModifier
            1.0, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.0, // educationModifier
            1.0, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            1.0, // populationGrowthModifier
            1.0 // maxPopulationModifier
        );
    }

    jungle(): PlanetType {
        return new PlanetType(
            "Jungle",
            0.6, // miningModifier
            0.6, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            0.4, // industryModifier
            0.4, // maxIndustryModifier
            0.5, // agricultureModifier
            0.5, // maxAgricultureModifier
            1.25, // defenceModifier
            1.25, // maxDefenceModifier
            1.2, // educationModifier
            1.2, // maxEducationModifier
            0.8, // healthModifier
            0.8, // maxHealthModifier
            0.8, // populationGrowthModifier
            1.4 // maxPopulationModifier
        );
    }

    forest(): PlanetType {
        return new PlanetType(
            "Forest",
            0.8, // miningModifier
            0.8, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            1.1, // industryModifier
            1.1, // maxIndustryModifier
            0.8, // agricultureModifier
            0.8, // maxAgricultureModifier
            1.1, // defenceModifier
            1.1, // maxDefenceModifier
            1.1, // educationModifier
            1.1, // maxEducationModifier
            0.9, // healthModifier
            0.9, // maxHealthModifier
            0.9, // populationGrowthModifier
            1.3 // maxPopulationModifier
        );
    }

    desert(): PlanetType {
        return new PlanetType(
            "Desert",
            1.2, // miningModifier
            0.8, // maxMiningModifier
            1.5, // spacePortModifier
            1.5, // maxSpacePortModifier
            0.5, // industryModifier
            0.5, // maxIndustryModifier
            0.1, // agricultureModifier
            0.1, // maxAgricultureModifier
            0.25, // defenceModifier
            0.25, // maxDefenceModifier
            1.0, // educationModifier
            1.0, // maxEducationModifier
            0.75, // healthModifier
            0.75, // maxHealthModifier
            0.5, // populationGrowthModifier
            0.5 // maxPopulationModifier
        );
    }

    barren(): PlanetType {
        return new PlanetType(
            "Barren",
            1.0, // miningModifier
            1.0, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            1.0, // industryModifier
            1.0, // maxIndustryModifier
            1.0, // agricultureModifier
            1.0, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.0, // educationModifier
            1.0, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            1.0, // populationGrowthModifier
            1.0 // maxPopulationModifier
        );
    }

    ocean(): PlanetType {
        return new PlanetType(
            "Ocean",
            1.0, // miningModifier
            1.0, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            1.0, // industryModifier
            1.0, // maxIndustryModifier
            1.0, // agricultureModifier
            1.0, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.0, // educationModifier
            1.0, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            1.0, // populationGrowthModifier
            1.0 // maxPopulationModifier
        );
    }

    ice(): PlanetType {
        return new PlanetType(
            "Ice",
            1.0, // miningModifier
            1.0, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            1.0, // industryModifier
            1.0, // maxIndustryModifier
            1.0, // agricultureModifier
            1.0, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.0, // educationModifier
            1.0, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            1.0, // populationGrowthModifier
            1.0 // maxPopulationModifier
        );
    }

    tundra(): PlanetType {
        return new PlanetType(
            "Tundra",
            1.0, // miningModifier
            1.0, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            1.0, // industryModifier
            1.0, // maxIndustryModifier
            1.0, // agricultureModifier
            1.0, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.0, // educationModifier
            1.0, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            1.0, // populationGrowthModifier
            1.0 // maxPopulationModifier
        );
    }

    gaia(): PlanetType {
        return new PlanetType(
            "Gaia",
            1.0, // miningModifier
            1.0, // maxMiningModifier
            1.0, // spacePortModifier
            1.0, // maxSpacePortModifier
            1.0, // industryModifier
            1.0, // maxIndustryModifier
            1.0, // agricultureModifier
            1.0, // maxAgricultureModifier
            1.0, // defenceModifier
            1.0, // maxDefenceModifier
            1.0, // educationModifier
            1.0, // maxEducationModifier
            1.0, // healthModifier
            1.0, // maxHealthModifier
            1.0, // populationGrowthModifier
            1.0 // maxPopulationModifier
        );
    }
}