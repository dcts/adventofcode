# Answers

| Part 1    | Part 2    |
| --------- | --------- |
| `1131506` | `7863147` |

## --- Day 3: Binary Diagnostic ---

The submarine has been making some odd creaking noises, so you ask it to produce a diagnostic report just in case.

The diagnostic report (your puzzle input) consists of a list of binary numbers which, when decoded properly, can tell you many useful things about the conditions of the submarine. The first parameter to check is the __power consumption__.

You need to use the binary numbers in the diagnostic report to generate two new binary numbers (called the __gamma rate__ and the __epsilon rate__). The power consumption can then be found by multiplying the gamma rate by the epsilon rate.

Each bit in the gamma rate can be determined by finding the __most common bit in the corresponding position__ of all numbers in the diagnostic report. For example, given the following diagnostic report:

    00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010
    

Considering only the first bit of each number, there are five `0` bits and seven `1` bits. Since the most common bit is `1`, the first bit of the gamma rate is `1`.

The most common second bit of the numbers in the diagnostic report is `0`, so the second bit of the gamma rate is `0`.

The most common value of the third, fourth, and fifth bits are `1`, `1`, and `0`, respectively, and so the final three bits of the gamma rate are `110`.

So, the gamma rate is the binary number `10110`, or __`22`__ in decimal.

The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is `01001`, or __`9`__ in decimal. Multiplying the gamma rate (`22`) by the epsilon rate (`9`) produces the power consumption, __`198`__.

Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. __What is the power consumption of the submarine?__ (Be sure to represent your answer in decimal, not binary.)

-----------------

## --- Part Two ---

Next, you should verify the __life support rating__, which can be determined by multiplying the __oxygen generator rating__ by the __CO2 scrubber rating__.

Both the oxygen generator rating and the CO2 scrubber rating are values that can be found in your diagnostic report - finding them is the tricky part. Both values are located using a similar process that involves filtering out values until only one remains. Before searching for either rating value, start with the full list of binary numbers from your diagnostic report and __consider just the first bit__ of those numbers. Then:

- Keep only numbers selected by the __bit criteria__ for the type of rating value for which you are searching. Discard numbers which do not match the bit criteria.
- If you only have one number left, stop; this is the rating value for which you are searching.
- Otherwise, repeat the process, considering the next bit to the right.

The __bit criteria__ depends on which type of rating value you want to find:

- To find __oxygen generator rating__, determine the __most common__ value (`0` or `1`) in the current bit position, and keep only numbers with that bit in that position. If `0` and `1` are equally common, keep values with a __`1`__ in the position being considered.
- To find __CO2 scrubber rating__, determine the __least common__ value (`0` or `1`) in the current bit position, and keep only numbers with that bit in that position. If `0` and `1` are equally common, keep values with a __`0`__ in the position being considered.

For example, to determine the __oxygen generator rating__ value using the same example diagnostic report from above:

- Start with all 12 numbers and consider only the first bit of each number. There are more `1` bits (7) than `0` bits (5), so keep only the 7 numbers with a `1` in the first position: `11110`, `10110`, `10111`, `10101`, `11100`, `10000`, and `11001`.
- Then, consider the second bit of the 7 remaining numbers: there are more `0` bits (4) than `1` bits (3), so keep only the 4 numbers with a `0` in the second position: `10110`, `10111`, `10101`, and `10000`.
- In the third position, three of the four numbers have a `1`, so keep those three: `10110`, `10111`, and `10101`.
- In the fourth position, two of the three numbers have a `1`, so keep those two: `10110` and `10111`.
- In the fifth position, there are an equal number of `0` bits and `1` bits (one each). So, to find the __oxygen generator rating__, keep the number with a `1` in that position: `10111`.
- As there is only one number left, stop; the __oxygen generator rating__ is `10111`, or _`23`_ in decimal.

Then, to determine the __CO2 scrubber rating__ value from the same example above:

- Start again with all 12 numbers and consider only the first bit of each number. There are fewer `0` bits (5) than `1` bits (7), so keep only the 5 numbers with a `0` in the first position: `00100`, `01111`, `00111`, `00010`, and `01010`.
- Then, consider the second bit of the 5 remaining numbers: there are fewer `1` bits (2) than `0` bits (3), so keep only the 2 numbers with a `1` in the second position: `01111` and `01010`.
- In the third position, there are an equal number of `0` bits and `1` bits (one each). So, to find the __CO2 scrubber rating__, keep the number with a `0` in that position: `01010`.
- As there is only one number left, stop; the __CO2 scrubber rating__ is `01010`, or __`10`__ in decimal.

Finally, to find the life support rating, multiply the oxygen generator rating (`23`) by the CO2 scrubber rating (`10`) to get __`230`__.

Use the binary numbers in your diagnostic report to calculate the oxygen generator rating and CO2 scrubber rating, then multiply them together. __What is the life support rating of the submarine?__ (Be sure to represent your answer in decimal, not binary.)