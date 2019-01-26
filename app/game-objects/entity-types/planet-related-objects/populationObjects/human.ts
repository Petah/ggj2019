import Species from "./species";
import PlanetTypeFactory from "../planetTypeFactory";

export default class Human implements Species {
    speciesName = "Human";
    speciesNamePlural = "Humans";
    speciesNameAdjective = "Human";
    imageLocation = "https://i.kinja-img.com/gawker-media/image/upload/s--QRQVNJ0S--/c_scale,f_auto,fl_progressive,q_80,w_800/rg18evcwxqjell5hcpue.jpg";
    populationGrowthRate = 0.1;
    populationConsumption = 1.0;
    foodConsumption = 1.0;
} 