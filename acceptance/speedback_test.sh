#!/bin/bash

function test_should_generate_a_single_round_with_a_pair() { 
  output=$(yarn cli -t "Rick,Andy")
  local string="Round 1

  Rick + Andy"
  assert_contains "${string}" "${output}"
}

function test_should_generate_five_rouds_for_a_team_of_five() {
  output=$(yarn cli -t "Ana, John, Maria, Clara, Andy")
  local string="Round 1

  Ana + Alone
  John + Andy
  Maria + Clara


Round 2

  Ana + Andy
  Alone + Clara
  John + Maria


Round 3

  Ana + Clara
  Andy + Maria
  Alone + John


Round 4

  Ana + Maria
  Clara + John
  Andy + Alone


Round 5

  Ana + John
  Maria + Alone
  Clara + Andy"
  assert_contains "${string}" "${output}"
}

function test_should_generate_eleven_rouds_for_a_team_of_eleven() {
  output=$(yarn cli -t "Person1,Person2,Person3,Person4,Person5,Person6,Person7,Person8,Person9,Person10,Person11")
  local string="Round 1

  Person1 + Alone
  Person2 + Person11
  Person3 + Person10
  Person4 + Person9
  Person5 + Person8
  Person6 + Person7


Round 2

  Person1 + Person11
  Alone + Person10
  Person2 + Person9
  Person3 + Person8
  Person4 + Person7
  Person5 + Person6


Round 3

  Person1 + Person10
  Person11 + Person9
  Alone + Person8
  Person2 + Person7
  Person3 + Person6
  Person4 + Person5


Round 4

  Person1 + Person9
  Person10 + Person8
  Person11 + Person7
  Alone + Person6
  Person2 + Person5
  Person3 + Person4


Round 5

  Person1 + Person8
  Person9 + Person7
  Person10 + Person6
  Person11 + Person5
  Alone + Person4
  Person2 + Person3


Round 6

  Person1 + Person7
  Person8 + Person6
  Person9 + Person5
  Person10 + Person4
  Person11 + Person3
  Alone + Person2


Round 7

  Person1 + Person6
  Person7 + Person5
  Person8 + Person4
  Person9 + Person3
  Person10 + Person2
  Person11 + Alone


Round 8

  Person1 + Person5
  Person6 + Person4
  Person7 + Person3
  Person8 + Person2
  Person9 + Alone
  Person10 + Person11


Round 9

  Person1 + Person4
  Person5 + Person3
  Person6 + Person2
  Person7 + Alone
  Person8 + Person11
  Person9 + Person10


Round 10

  Person1 + Person3
  Person4 + Person2
  Person5 + Alone
  Person6 + Person11
  Person7 + Person10
  Person8 + Person9


Round 11

  Person1 + Person2
  Person3 + Alone
  Person4 + Person11
  Person5 + Person10
  Person6 + Person9
  Person7 + Person8"
  assert_contains "${string}" "${output}"
}