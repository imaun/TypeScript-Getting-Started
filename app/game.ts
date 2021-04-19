import { getValue } from './utility';
import { Result } from './Result';
import { Player } from './player';
import { Scoreboard } from './scoreboard';

export class Game {
    private scoreboard: Scoreboard = new Scoreboard();

    constructor(public player: Player, public problemCount: number, public factor: number) {
    } 

    // create the HTML for the current game
    displayGame(): void {
        let gameForm: string = '';
        for(let i = 1; i <= this.problemCount; i++) {
            gameForm += '<div class="form-group">';
            gameForm += '<label for="answer' + i + '" class="col-sm-2 control-label">';
            gameForm += String(this.factor) + ' X ' + i + ' = </label>';
            gameForm += '<div class="col-sm-1"><input type="text" class="form-control" id="answer"' + i + '" size="5" /></div>';
            gameForm += '</div>';
        }

        // add new game to the page
        const gameElement: HTMLElement = document.getElementById('game')!;
        gameElement.innerHTML = gameForm;

        // enable the calculate score button
        document.getElementById('calculate')!.removeAttribute('disabled');
    }

    calculateScore(): void {
        let score: number = 0;

        for(let i = 1; i <= this.problemCount; i++) {
            const answer: number = Number(getValue('answer' + i));
            if(i * this.factor === answer) {
                score++;
            }
        }

        const result: Result = {
            player: this.player.name,
            score: score,
            problemsCount: this.problemCount,
            factor: this.factor
        };

        this.scoreboard.addResult(result);
        this.scoreboard.updateScoreboard();

        // disable the calculate score button
        document.getElementById('calculate')!.setAttribute('disabled', 'true');
    }
}