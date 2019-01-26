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
            case 6: planetType = this.ice();
            case 7: planetType = this.tundra();
            case 8: planetType = this.ocean();
            case 9: planetType = this.gaia();
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
            1.0, // healthModifier
            1.0, // maxHealthModifier
            0.8, // populationGrowthModifier
            1.4 // maxPopulationModifier
        );
    }

    forest(): PlanetType {
        return new PlanetType(
            "Forest",
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

    desert(): PlanetType {
        return new PlanetType(
            "Desert",
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