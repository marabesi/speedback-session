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

interface PossiblePairs extends Member  {
  met: boolean;
  busy: boolean;
}

interface PairsTable {
  member: Member;
  possiblePairs: PossiblePairs[]
}

const alone = { id: '-', name: 'Alone' };

export class SpeedbackSession implements Speedback {
  private currentRound: number = 1;
  private matrixOfPairs: Array<PairsTable[]> = [];
  private shouldUseAlone: boolean = false;
  private originalTeam: Member[] = [];

  constructor(private team: Member[], private options?: SpeedbackOptions) {
    this.originalTeam = [ ...this.team ];
  }

  private fillAllPossibleMatchesForA(member: Member, index: number): PossiblePairs[] {
    let team = this.originalTeam
      .filter(user => {
        return user.id !== member.id;
      });

    if (this.shouldUseAlone && (team.length === 1 || index === 0)) {
      team.push(alone);
    }

    if (this.shouldUseAlone && index > 0) {
      team.unshift(alone);
    }

    return team.reverse().map(user => ({
      ...user,
      met: false,
      busy: false
    }));
  }

  private findFirstAvailablePersonFor(member: Member, round: number): Member[] {
    if (round !== this.currentRound) {
      this.makeAllMembersNotBusy();
      this.currentRound = round;
    }

    if (this.isBusy(member)) return [];

    const membersToPair: Member[] = [member];

    for (let j = 0; j < this.matrixOfPairs.length; j++) {
      const currentMember = this.matrixOfPairs[j][0];
      
      if (currentMember.member.id === member.id) {
        for (let n = 0; n < currentMember.possiblePairs.length; n++) {
          const possiblePair = currentMember.possiblePairs[n];
          
          if (possiblePair.met) {
            continue;
          }

          if (!possiblePair.busy) {
            membersToPair.push(possiblePair);

            this.markBusy(possiblePair);
            this.markBusy(member);

            this.markMetForBoth(member, possiblePair);
            break;
          }
        }
      }
    }

    return membersToPair.map(pair => {
      return { id: pair.id, name: pair.name }
    });
  }

  private makeAllMembersNotBusy() {
    for (let j = 0; j < this.matrixOfPairs.length; j++) {
      const currentMember = this.matrixOfPairs[j][0];

      for (let n = 0; n < currentMember.possiblePairs.length; n++) {
        const possiblePair = currentMember.possiblePairs[n];
          possiblePair.busy = false;
      }
    }
  }

  private markMetForBoth(member: Member, possiblePair: PossiblePairs) {
    for (let j = 0; j < this.matrixOfPairs.length; j++) {
      const currentMember = this.matrixOfPairs[j][0];
      if (member.id === currentMember.member.id) {
        for (let n = 0; n < currentMember.possiblePairs.length; n++) {
          if (possiblePair.id === currentMember.possiblePairs[n].id) {
            currentMember.possiblePairs[n].met = true;
            break;
          }
        }
      }
    }

    for (let j = 0; j < this.matrixOfPairs.length; j++) {
      const currentMember = this.matrixOfPairs[j][0];
      if (possiblePair.id === currentMember.member.id) {
        for (let n = 0; n < currentMember.possiblePairs.length; n++) {
          if (member.id === currentMember.possiblePairs[n].id) {
            currentMember.possiblePairs[n].met = true;
            break;
          }
        }
      }
    }
  }

  private isBusy(member: Member): boolean {
    for (let j = 0; j < this.matrixOfPairs.length; j++) {
      const currentMember = this.matrixOfPairs[j][0];

      for (let n = 0; n < currentMember.possiblePairs.length; n++) {
        const possiblePair = currentMember.possiblePairs[n];
        if (possiblePair.id === member.id && possiblePair.busy) {
          return true
        }
      }
    }
    return false;
  }

  private markBusy(member: Member) {
    for (let j = 0; j < this.matrixOfPairs.length; j++) {
      const currentMember = this.matrixOfPairs[j][0];

      for (let n = 0; n < currentMember.possiblePairs.length; n++) {
        const possiblePair = currentMember.possiblePairs[n];
        if (possiblePair.id === member.id) {
          possiblePair.busy = true;
        }
      }
    }
  }

  generateRounds(): Rounds[] {
    const teamMembers = this.team.length;

    if (!teamMembers) {
      return [];
    }

    if (teamMembers % 2) {
      this.shouldUseAlone = true;
    }

    if (this.options && this.options.shuffle) {
      this.team = shuffle(this.team);
    }

    for (let i = 0; i < teamMembers; i++) {
      const possiblePairs = this.fillAllPossibleMatchesForA(this.team[i], i);
      this.matrixOfPairs[i] = [
        { member: this.team[i], possiblePairs } 
      ];
    }

    const numberOfRounds = this.matrixOfPairs[0][0].possiblePairs.length;
    let currentRound = 1;

    const returnMatrix: Rounds[] = [];

    while (currentRound <= numberOfRounds) {

      const pairs = [];
      for (let i = 0; i < this.team.length; i++) {
        pairs.push(
          this.findFirstAvailablePersonFor(this.team[i], currentRound),
        );
      }

      returnMatrix.push({
        roundNumber: currentRound,
        pairs: pairs.filter((rouds: Member[]) => rouds.length > 0)
      });

        currentRound++;
    }

    return returnMatrix;
  }
}

