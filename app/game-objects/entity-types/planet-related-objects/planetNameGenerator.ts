import PlanetType from "./planetType";

export default class PlanetNameGenerator {
    private gasGiantNames: string[] = ["Saturn", "Space Fart", "Fomalhaut"]

    public generateName(planet: PlanetType) {
        var name: string;
        switch (planet.typeName) {
            case "Gas Giant": name = this.generateGasGiantName();
            case "Volcanic": name = this.generateVolcanicName();
            case "Continental": name = this.generateContinentalName();
            case "Jungle": name = this.generateJungleName();
            case "Forest": name = this.generateForestName();
            case "Desert": name = this.generateDesertName();
            case "Barren": name = this.generateBarrenName();
            case "Ocean": name = this.generateOceanName();
            case "Ice": name = this.generateIceName();
            case "Tundra": name = this.generateTundraName();
            case "Gaia": name = this.generateGaiaName();
        }

        return name;
    }

    private generateGasGiantName(): string {
        if (this.gasGiantNames.length == 0) {
            return "";
        }

        var index = Math.floor(Math.random() * this.gasGiantNames.length);
        var name = this.gasGiantNames.splice(index, 1);

        return name[0];
    }

    private generateVolcanicName(): string {
        return "Hellscape";
    }

    private generateContinentalName(): string {
        return "Earth";
    }

    private generateJungleName(): string {
        return "Endore";
    }

    private generateForestName(): string {
        return "Hairy Jerry";
    }

    private generateDesertName(): string {
        return "Tatooine";
    }

    private generateBarrenName(): string {
        return "Dovid";
    }

    private generateOceanName(): string {
        return "Willy";
    }

    private generateIceName(): string {
        return "Hoth";
    }

    private generateTundraName(): string {
        return "Belgium";
    }

    private generateGaiaName(): string {
        return "Mega Earth";
    }
}