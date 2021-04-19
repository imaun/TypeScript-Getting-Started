import { Person } from "./person";

export class Player implements Person {
    formatName() {
        return this.name.toUpperCase();
    }
    name: string;
    age?: number;
    highScore: number;
}