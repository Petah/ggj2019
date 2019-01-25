import PlanetType from "./planetType";

export default class PlanetTypeFactory {

    random(): PlanetType {
        var random = Math.random() * 4;
        var planetType: PlanetType;
        switch(random) {
            case 1: planetType = this.gasGiant();
            case 2: planetType = this.volcanic();
            case 3: planetType = this.continental();
            case 4: planetType = this.jungle();
            default: planetType = this.gasGiant();
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
        return null;
    }

    desert(): PlanetType {
        return null;
    }

    barren(): PlanetType {
        return null;
    }

    ocean(): PlanetType {
        return null;
    }

    ice(): PlanetType {
        return null;
    }

    tundra(): PlanetType {
        return null;
    }

    gaia(): PlanetType {
        return null;
    }
}