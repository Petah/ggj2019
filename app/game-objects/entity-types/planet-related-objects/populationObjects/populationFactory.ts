import Species from "./species";
import Planet from "../../../../planet";
import Ork from "./ork";
import Human from "./human";
import Population from "./population";

export default class PopulationFactory {
    private species: Species[] = [new Ork, new Human]

    public generatePopulationForPlanet(): Population {
        return new Population(
            null,
            0,
            100,
        );
    }

    public generateSpeciesForPlanet(): Species {
        return this.getSpecies(this.species);
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