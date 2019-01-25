import PlanetType from "./planetType";

export default class PlanetNameGenerator {
    private gasGiantNames: string[] = ["Saturn", "Space Fart", "Fomalhaut"];
    private volcanicNames: string[] = ["Vulkan"];
    private continentalNames: string[] = ["Earth", "Alpha Centauri", "Eden Prime"];
    private jungleNames: string[] = ["Bungle"];
    private forestNames: string[] = ["Endor"]
    private desertNames: string[] = ["Arrakis", "Tatooine"] 
    private barrenNames: string[] = ["New Mars", "Belgium", "Dovid"] 
    private oceanNames: string[] = ["Caladan"] 
    private iceNames: string[] = ["Hoth"] 
    private tundraNames: string[] = ["Gulag"] 
    private gaianNames: string[] = ["New Dawn"] 

    public generateName(planet: PlanetType) {
        var name: string;
        switch (planet.typeName) {
            case "Gas Giant": name = this.generatePlanetName(this.gasGiantNames);
            case "Volcanic": name = this.generatePlanetName(this.volcanicNames);
            case "Continental": name = this.generatePlanetName(this.continentalNames);
            case "Jungle": name = this.generatePlanetName(this.gasGiantNames);
            case "Forest": name = this.generatePlanetName(this.forestNames);
            case "Desert": name = this.generatePlanetName(this.desertNames);
            case "Barren": name = this.generatePlanetName(this.barrenNames);
            case "Ocean": name = this.generatePlanetName(this.oceanNames);
            case "Ice": name = this.generatePlanetName(this.iceNames);
            case "Tundra": name = this.generatePlanetName(this.tundraNames);
            case "Gaia": name = this.generatePlanetName(this.gaianNames);
        }

        return name;
    }

    private generatePlanetName(nameList: string[]): string {
        if (nameList.length == 0) {
            return "";
        }

        var index = Math.floor(Math.random() * nameList.length);
        var name = nameList.splice(index, 1);

        return name[0];
    }
}