import { Member, SpeedbackSession } from "./Speedback";

const term = require('terminal-kit').terminal;
const { program } = require('commander');

program
  .option('-t, --team <members>', 'Your team member names comma separeted');

program.parse();

const options = program.opts();

if (!options.team) {
  term("Provide at least one team member\n");
  process.exit(1);
}

const teamMemberNames = options.team || [];

const members = teamMemberNames
  .split(',')
  .map(name => name.trim())
  .map((name: string, index: number): Member => ({
    id: `${index + 1}`,
    name,
  }));

const speedbackSession = new SpeedbackSession(members);
const rounds = speedbackSession.generateRounds();

rounds.forEach((rounds) => {
  term.bold(`Round ${rounds.roundNumber}\n`);
  term("\n");

  rounds.pairs.forEach((member) => {
    term(`  ${member[0].name} + ${member[1].name}\n`);
  });

  term("\n\n");
});