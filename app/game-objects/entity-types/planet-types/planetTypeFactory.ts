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
            1.1,
            1.5,
            0.1,
            0.1,
            1.0,
            1.5,
            0.0,
            0.0,
            1.0,
            1.0,
            1.0,
            1.1,
            0.1,
            0.01
        );
    }

    volcanic(): PlanetType {
        return new PlanetType(
            "Volcanic",
            1.4,
            2.0,
            0.6,
            0.6,
            1.1,
            1.5,
            0.05,
            0.1,
            1.0,
            1.0,
            1.2,
            1.0,
            0.1,
            0.01
        );
    }

    continental(): PlanetType {
        return new PlanetType(
            "Continental",
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0
        );
    }

    jungle(): PlanetType {
        return new PlanetType(
            "Jungle",
            0.6,
            0.6,
            1.0,
            1.0,
            0.4,
            0.4,
            0.5,
            0.5,
            1.25,
            1.25,
            1.2,
            1.2,
            0.8,
            1.4
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