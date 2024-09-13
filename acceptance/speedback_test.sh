#!/bin/bash

function test_should_generate_a_single_round_with_a_pair() { 
  output=$(yarn cli -t "Rick,Andy")
  local string="Round 1

  Rick + Andy"
  assert_contains "${string}" "${output}"
}