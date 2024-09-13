import { shuffle } from './shuffle';

export interface Rounds {
  roundNumber: number;
  pairs: Array<Member[]>
}

export interface Member {
  id: string;
  name: string;
}

export interface SpeedbackOptions {
  shuffle: boolean;
}

export interface Speedback {
  generateRounds(): Rounds[];
}

const alone = { id: '-', name: 'Alone' };

export class SpeedbackSession implements Speedback {
  private matrixOfPairs: Member[][][];

  constructor(private team: Member[], private options?: SpeedbackOptions) { }

  generateRounds(): Rounds[] {
    const teamMembers = this.team.length;

    if (!teamMembers) {
      return [];
    }

    if (this.team.length === 1) {
      return [
        {
          roundNumber: 1,
          pairs: [[this.team[0], alone]]
        }
      ]
    }

    if (this.team.length === 2) {
      return [
        {
          roundNumber: 1,
          pairs: [[this.team[0], this.team[1]]]
        }
      ]
    }

    if (this.options && this.options.shuffle) {
      this.team = shuffle(this.team);
    }

    const returnMatrix: Rounds[] = [];

    this.matrixOfPairs = this.roundRobin(this.team);

    this.matrixOfPairs.forEach((round, index) => {
      const pairs = [];
      round.forEach(match => pairs.push([match[0], match[1]]));

      returnMatrix.push({
        roundNumber: index + 1,
        pairs
      });
    });

    return returnMatrix;
  }

  private roundRobin(participants: Member[]): Member[][][] {
    const totalParticipants = participants.length;

    if (totalParticipants % 2 !== 0) {
      participants.push(alone);
    }

    const totalRounds = participants.length - 1;
    const halfSize = participants.length / 2;
    const schedule: Member[][][] = [];

    for (let round = 0; round < totalRounds; round++) {
      const roundMatches: Member[][] = [];

      for (let i = 0; i < halfSize; i++) {
        const home = participants[i];
        const away = participants[participants.length - 1 - i];
        roundMatches.push([home, away]);
      }

      schedule.push(roundMatches);

      const last = participants.pop();
      if (last) {
        participants.splice(1, 0, last);
      }
    }

    return schedule;
  }
}

