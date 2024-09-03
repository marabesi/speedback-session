# Speedback session

Speedback session is a package that automatically create the rounds and the pairs for your speedback.

## What is speedback?

Speedback is designed to facilitate quick and frequent feedback exchanges, enabling more regular and informal feedback
loops. This streamlined approach helps build trust and fosters continuous improvement, ultimately supporting the personal
and professional development.

- [Running a Speedback session](https://www.codurance.com/publications/speedback-session-feedback)
- [​What speedback is and how to run it using zoom breakout rooms](https://www.thoughtworks.com/en-es/insights/blog/what-speedback-and-how-run-it-using-zoom-breakout-rooms)

## How to use this package

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

## Resources used

- [How to make a shell executable node file using TypeScript](https://stackoverflow.com/a/31366216/2258921)
- [Node.js formatted console output](https://stackoverflow.com/a/42801006/2258921)
- [End-to-end test your CLI tools](https://dev.to/giuliano1993/end-to-end-test-your-cli-tools-4gph)
