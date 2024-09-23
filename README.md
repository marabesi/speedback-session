# Speedback session

[![Continuous Integration Workflow](https://github.com/marabesi/speedback-session/actions/workflows/nodejs.yml/badge.svg)](https://github.com/marabesi/speedback-session/actions/workflows/nodejs.yml)

[![https://nodei.co/npm/speedback-session.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/speedback-session.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/speedback-session)

Speedback session is a package that automatically create the rounds and the pairs for your speedback.

## What is speedback?

Speedback is designed to facilitate quick and frequent feedback exchanges, enabling more regular and informal feedback
loops. This streamlined approach helps build trust and fosters continuous improvement, ultimately supporting the personal
and professional development.

- [Running a Speedback session](https://www.codurance.com/publications/speedback-session-feedback)
- [​What speedback is and how to run it using zoom breakout rooms](https://www.thoughtworks.com/en-es/insights/blog/what-speedback-and-how-run-it-using-zoom-breakout-rooms)
- [Speedback Feedback](https://labspractices.com/practices/speedback)
- [Speedback: De-stigmatise feedback via speed-dating principles](https://medium.com/@joshproduct/speedback-de-stigmatise-feedback-with-speed-dating-principles-4708d493fb63)
- [How to Run a 360˚ Speedback](https://meganesulli.com/blog/how-to-run-a-speedback)
- [Speed-back feedback](https://medium.com/@tmarinkovic.tm/speed-back-feedback-6b8c35bfe005)
- [yqht/speedback-app-ahoy](https://github.com/lyqht/speedback-app-ahoy)

## How to use this package

This package is available in two ways, the first is to use it as a command line tool and the second is programmatically.

### Command line tool

```sh
npx speedback-session --team "Eugenia Sweeney,Korey Daugherty,Katina Kelly"
```

The output will be the following:

```sh
Round 1

  Eugenia Sweeney + Korey Daugherty
  Katina Kelly + Alone


Round 2

  Eugenia Sweeney + Katina Kelly
  Korey Daugherty + Alone


Round 3

  Eugenia Sweeney + Alone
  Korey Daugherty + Katina Kelly
```

### Programatically

Installing the package in your project, via npm or yarn

```sh
npm i speedback-session --save
# or
yarn add speedback-session
```

And then, using the package via nodejs:

```js
const { SpeedbackSession } = require("speedback-session");

const team = [
  {id: '1 ', name: 'Ana'},
  {id: '2', name: 'John'}
];

const speedback = new SpeedbackSession(team);
const rounds = speedback.generateRounds();

console.log(rounds);

// outputs

[
  {
    "roundNumber": 1,
    "pairs": [
      [
        {
          "id": "1 ",
          "name": "Ana"
        },
        {
          "id": "2",
          "name": "John"
        }
      ]
    ]
  }
]
```

## Resources used

- [How to make a shell executable node file using TypeScript](https://stackoverflow.com/a/31366216/2258921)
- [Node.js formatted console output](https://stackoverflow.com/a/42801006/2258921)
- [End-to-end test your CLI tools](https://dev.to/giuliano1993/end-to-end-test-your-cli-tools-4gph)

## Related material

- https://www.smashingmagazine.com/2022/04/testing-cli-way-people-use-it/
- https://www.smashingmagazine.com/2021/11/powerful-terminal-commandline-tools-modern-web-development/
- https://pkaramol.medium.com/end-to-end-command-line-tool-testing-with-bats-and-auto-expect-7a4ffb19336d
- https://github.com/vesln/nixt
- https://katalon.com/resources-center/blog/end-to-end-e2e-testing-tools-frameworks

### round robin

- [An efficient approach to combinations of pairs in groups without repetitions?](https://stackoverflow.com/questions/54447564/an-efficient-approach-to-combinations-of-pairs-in-groups-without-repetitions)

### acceptance testing

- https://github.com/cucumber/cucumber-js
- https://www.testim.io/blog/cucumber-js-for-bdd-an-introductory-tutorial-with-examples/
- https://daniel-delimata.medium.com/cucumber-in-the-typescript-a86bd03117a7

- https://stackabuse.com/how-to-save-command-output-as-variable-in-bash/
