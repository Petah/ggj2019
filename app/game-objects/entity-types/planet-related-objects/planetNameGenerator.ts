import PlanetType from "./planetType";

export default class PlanetNameGenerator {
    private gasGiantNames: string[] = ["Saturn", "Space Fart", "Fomalhaut", "Kachoria", "Gretchin", "Youranus", "Dandledoom"];
    private volcanicNames: string[] = ["Vulkan", "Waluigi", "Nintenduu 64", "Excalbia", "Menjin", "Krypton"];
    private continentalNames: string[] = ["Earth", "Alpha Centauri", "Eden Prime", "Kerbol", "Olimar", "Holy Terra"];
    private jungleNames: string[] = ["Bungle", "Kipling", "Omicron Persei 8", "Fortuna", "Ixalan", "Pendis"];
    private forestNames: string[] = ["Endor", "Solaria", "Brain Slug Planet", "Innistrad", "Klap"]
    private desertNames: string[] = ["Arrakis", "Tatooine", "Not Tatooine (Jakku)", "Athas", "Kharak", "Korriban", "Hocotate", "Ocampa", "Toroth", "Vulcan"] 
    private barrenNames: string[] = ["New Mars", "Belgium", "Dovid", "Giedi", "Spheron I", "127.0.0.1", "Slurt"] 
    private oceanNames: string[] = ["Caladan", "R'lyeh", "Dagon", "Thalassa", "Russalka", "Muur", "4546B", "GQ"] 
    private iceNames: string[] = ["Hoth", "Yump", "Neutral Planet", "Gethen", "Fichina", "Bicth", "Ryan Renolds the planet"] 
    private tundraNames: string[] = ["Gulag", "Melpomenia", "Atlas", "Gimp", "Ganthiya", "Factfur", "MEA"]
    private gaianNames: string[] = ["New Dawn", "cKnoor", "Ulm", "Walled Garden", "Beautopia Rising", "ɐıʃɐɹʇsn∀"] 

    public generateName(planet: PlanetType) {
        var name: string;
        switch (planet.typeName) {
            case "Gas Giant": name = this.generatePlanetName(this.gasGiantNames); break;
            case "Volcanic": name = this.generatePlanetName(this.volcanicNames); break;
            case "Continental": name = this.generatePlanetName(this.continentalNames); break;
            case "Jungle": name = this.generatePlanetName(this.jungleNames); break;
            case "Forest": name = this.generatePlanetName(this.forestNames); break;
            case "Desert": name = this.generatePlanetName(this.desertNames); break;
            case "Barren": name = this.generatePlanetName(this.barrenNames); break;
            case "Ocean": name = this.generatePlanetName(this.oceanNames); break;
            case "Ice": name = this.generatePlanetName(this.iceNames); break;
            case "Tundra": name = this.generatePlanetName(this.tundraNames); break;
            case "Gaia": name = this.generatePlanetName(this.gaianNames); break;
        }

        return name;
    }

    private generatePlanetName(nameList: string[]): string {
        if (nameList.length == 0) {
        console.log("no names" + nameList.toString())
            return "Planet " + (Math.random() * 1000);
        }

        var index = Math.floor(Math.random() * nameList.length);
        var name = nameList.splice(index, 1);

        return name[0];
    }
}