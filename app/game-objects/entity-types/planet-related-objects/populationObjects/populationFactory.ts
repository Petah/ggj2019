import Species from "./species";
import Planet from "../../../../planet";
import Ork from "./ork";
import Human from "./human";
import Population from "./population";

export default class PopulationFactory {
    private continentalSpecies: Species[] = [new Ork, new Human]

    public generatePopulationForPlanet(planet: Planet): Population {
        let population = new Population(this.generateSpeciesForPlanet(planet),
            100,
            100);
        return population;
    }

    public generateSpeciesForPlanet(planet: Planet): Species {
        let planetType = planet.plantetType;

        switch (planetType.typeName) {
            case "Gas Giant": return this.getSpecies([]);
            case "Volcanic": return this.getSpecies([]);
            case "Continental": return this.getSpecies(this.continentalSpecies);
            case "Jungle": return this.getSpecies([]);
            case "Forest": return this.getSpecies([]);
            case "Desert": return this.getSpecies([]);
            case "Barren": return this.getSpecies([]);
            case "Ocean": return this.getSpecies([]);
            case "Ice": return this.getSpecies([]);
            case "Tundra": return this.getSpecies([]);
            case "Gaia": return this.getSpecies([]);
        }

        return null;
    }

    private getSpecies(speciesList: Species[]): Species {
        if (speciesList.length == 0) {
            return null;
        }

        var index = Math.floor(Math.random() * speciesList.length);
        var species = speciesList.splice(index, 1);

        return species[0];
    }
}