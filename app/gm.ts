import Ship from "./ship";

export default class GM {
    static pointDirection(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }

    static pointDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
    }

    static lengthDirX(length: number, direction: number): number {
        return Math.cos(direction * Math.PI / 180) * length;
    }

    static lengthDirY(length: number, direction: number): number {
        return Math.sin(direction * Math.PI / 180) * length;
    }

    static motionAdd(self: Ship, speed: number, direction: number): void {
        let x2 = GM.lengthDirX(self.speed, self.direction) + GM.lengthDirX(speed, direction);
        let y2 = GM.lengthDirY(self.speed, self.direction) + GM.lengthDirY(speed, direction);
        self.speed = GM.hypot(x2, y2);
        self.direction = GM.pointDirection(0, 0, x2, y2);
    }

    static hypot(x: number, y: number): number {
        return Math.sqrt((x * x) + (y * y));
    }

    static randomSign(): number {
        return Math.random() > 0.5 ? -1 : 1;
    }
}
