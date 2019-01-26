import Species from "./species";
import PlanetTypeFactory from "../planetTypeFactory";

export default class Human implements Species {
    speciesName = "Human";
    speciesNamePlural = "Humans";
    speciesNameAdjective = "Human";
    imageLocation = "https://i.kinja-img.com/gawker-media/image/upload/s--QRQVNJ0S--/c_scale,f_auto,fl_progressive,q_80,w_800/rg18evcwxqjell5hcpue.jpg";
    populationGrowthRate: 1.0;
    populationConsumption: 1.0;
    foodConsumption: 1.0;
    prefferedPlanetType = new PlanetTypeFactory().continental()


    // ORKS ORKS ORKS ORKS
    // WAAAAAAGHHH!
} 