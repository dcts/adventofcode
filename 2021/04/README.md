# Answers

| Part 1 | Part 2 |
| ------ | ------ |
| `????` | `????` |

## --- Day 4: Giant Squid ---

You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you __can__ see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play __[bingo](https://en.wikipedia.org/wiki/Bingo_(American_version)__?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is __marked__ on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board __wins__. (Diagonals don't count.)

The submarine has a __bingo subsystem__ to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

    7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

    22 13 17 11  0
    8  2 23  4 24
    21  9 14 16  7
    6 10  3 18  5
    1 12 20 15 19

    3 15  0  2 22
    9 18 13 17  5
    19  8  7 25 23
    20 11 10 24  4
    14 21 16 12  6

    14 21 17 24  4
    10 16 15  9 19
    18  8 23 26 20
    22 11 13  6  5
    2  0 12  3  7

After the first five numbers are drawn (`7`, `4`, `9`, `5`, and `11`), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

    22 13 17 ✅  0         3 15  0  2 22        14 21 17 24 ✅
     8  2 23 ✅ 24        ✅ 18 13 17 ✅        10 16 15 ✅ 19
    21 ✅ 14 16 ✅        19  8 ✅ 25 23        18  8 23 26 20
     6 10  3 18  5        20 ✅ 10 24 ✅        22 ✅ 13  6 ✅
     1 12 20 15 19        14 21 16 12  6         2  0 12  3 ✅

After the next six numbers are drawn (`17`, `23`, `2`, `0`, `14`, and `21`), there are still no winners:

    22 13 ✅ ✅ ✅         3 15 ✅ ✅ 22        ✅ ✅ ✅ 24 ✅
     8 ✅ ✅ ✅ 24        ✅ 18 13 ✅ ✅        10 16 15 ✅ 19
    ✅ ✅ ✅ 16 ✅        19  8 ✅ 25 ✅        18  8 ✅ 26 20
     6 10  3 18  5        20 ✅ 10 24 ✅        22 ✅ 13  6 ✅
     1 12 20 15 19        ✅ ✅ 16 12  6        ✅ ✅ 12  3 ✅

Finally, `24` is drawn:

    22 13 ✅ ✅ ✅         3 15 ✅ ✅ 22        ❌ ❌ ❌ ❌ ❌
     8 ✅ ✅ ✅ ✅        ✅ 18 13 ✅ ✅        10 16 15 ✅ 19
    ✅ ✅ ✅ 16 ✅        19  8 ✅ 25 ✅        18  8 ✅ 26 20
     6 10  3 18  5        20 ✅ 10 ✅ ✅        22 ✅ 13  6 ✅
     1 12 20 15 19        ✅ ✅ 16 12  6        ✅ ✅ 12  3 ✅

At this point, the third board __wins__ because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: __`14 21 17 24 4`__).

The __score__ of the winning board can now be calculated. Start by finding the __sum of all unmarked numbers__ on that board; in this case, the sum is `188`. Then, multiply that sum by the number that was just called when the board won, `24`, to get the final score, `188 * 24 = __4512__`.

To guarantee victory against the giant squid, figure out which board will win first. __What will your final score be if you choose that board?__

-----------------

## --- Part Two ---
