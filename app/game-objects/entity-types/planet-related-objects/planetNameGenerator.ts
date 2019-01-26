import PlanetType from "./planetType";

export default class PlanetNameGenerator {
    private gasGiantNames: string[] = ["Saturn", "Space Fart", "Fomalhaut", "Kachoria", "Gretchin", "Youranus", "Dandledoom"];
    private volcanicNames: string[] = ["Vulkan", "Waluigi", "Nintenduu 64", "Excalbia", "Menjin"];
    private continentalNames: string[] = ["Earth", "Alpha Centauri", "Eden Prime", "Kerbol", "Olimar", "Holy Terra"];
    private jungleNames: string[] = ["Bungle", "Kipling", "Omicron Persei 8", "Fortuna", "Ixalan", "Pendis"];
    private forestNames: string[] = ["Endor", "Solaria", "Brain Slug Planet", "Innistrad", "Klap"]
    private desertNames: string[] = ["Arrakis", "Tatooine", "Not Tatooine (Jakku)", "Athas", "Kharak", "Korriban", "Hocotate", "Ocampa", "Toroth", "Vulcan"] 
    private barrenNames: string[] = ["New Mars", "Belgium", "Dovid", "Giedi", "Spheron I", "127.0.0.1", "Slurt"] 
    private oceanNames: string[] = ["Caladan", "R'lyeh", "Dagon", "Thalassa", "Russalka", "Muur", "4546B"] 
    private iceNames: string[] = ["Hoth", "Yump", "Neutral Planet", "Gethen", "Fichina", "Bicth"] 
    private tundraNames: string[] = ["Gulag", "Melpomenia", "Atlas", "Gimp", "Ganthiya", "Factfur"] 
    private gaianNames: string[] = ["New Dawn", "cKnoor", "Ulm", "Walled Garden", "Beautopia Rising"] 

    public generateName(planet: PlanetType) {
        var name: string;
        switch (planet.typeName) {
            case "Gas Giant": name = this.generatePlanetName(this.gasGiantNames);
            case "Volcanic": name = this.generatePlanetName(this.volcanicNames);
            case "Continental": name = this.generatePlanetName(this.continentalNames);
            case "Jungle": name = this.generatePlanetName(this.jungleNames);
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
            return "Planet " + (Math.random() * 1000);
        }

        var index = Math.floor(Math.random() * nameList.length);
        var name = nameList.splice(index, 1);

        return name[0];
    }
}