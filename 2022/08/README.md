# Answers

| Part 1 | Part 2   |
| ------ | -------- |
| `1779` | `172224` |

## --- Day 8: Treetop Tree House ---

The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a [tree house](https://en.wikipedia.org/wiki/Tree_house).

First, determine whether there is enough tree cover here to keep a tree house __hidden__. To do this, you need to count the number of trees that are __visible from outside the grid__ when looking directly along a row or column.

The Elves have already launched a [quadcopter](https://en.wikipedia.org/wiki/Quadcopter) to generate a map with the height of each tree (your puzzle input). For example:

    30373
    25512
    65332
    33549
    35390

Each tree is represented as a single digit whose value is its height, where `0` is the shortest and `9` is the tallest.

A tree is __visible__ if all of the other trees between it and an edge of the grid are __shorter__ than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

All of the trees around the edge of the grid are __visible__ - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the __interior nine trees__ to consider:

- The top-left `5` is __visible__ from the left and top. (It isn't visible from the right or bottom since other trees of height `5` are in the way.)
- The top-middle `5` is __visible__ from the top and right.
- The top-right `1` is not visible from any direction; for it to be visible, there would need to only be trees of height __0__ between it and an edge.
- The left-middle `5` is __visible__, but only from the right.
- The center `3` is not visible from any direction; for it to be visible, there would need to be only trees of at most height `2` between it and an edge.
- The right-middle `3` is __visible__ from the right.
- In the bottom row, the middle `5` is __visible__, but the `3` and `4` are not.

With 16 trees visible on the edge and another 5 visible in the interior, a total of __`21`__ trees are visible in this arrangement.

Consider your map; __how many trees are visible from outside the grid?__

-----------------

## --- Part Two ---

Content with the amount of tree cover available, the Elves just need to know the best spot to build their tree house: they would like to be able to see a lot of __trees__.

To measure the viewing distance from a given tree, look up, down, left, and right from that tree; stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration. (If a tree is right on the edge, at least one of its viewing distances will be zero.)

The Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large [eaves](https://en.wikipedia.org/wiki/Eaves) to keep it dry, so they wouldn't be able to see higher than the tree house anyway.

In the example above, consider the middle `5` in the second row:

    30373
    25512
    65332
    33549
    35390

- Looking up, its view is not blocked; it can see __`1`__ tree (of height `3`).
- Looking left, its view is blocked immediately; it can see only __`1`__ tree (of height `5`, right next to it).
- Looking right, its view is not blocked; it can see __`2`__ trees.
- Looking down, its view is blocked eventually; it can see __`2`__ trees (one of height `3`, then the tree of height `5` that blocks its view).

A tree's __scenic score__ is found by __multiplying together__ its viewing distance in each of the four directions. For this tree, this is __`4`__ (found by multiplying `1 * 1 * 2 * 2`).

However, you can do even better: consider the tree of height `5` in the middle of the fourth row:

    30373
    25512
    65332
    33549
    35390

- Looking up, its view is blocked at __`2`__ trees (by another tree with a height of `5`).
- Looking left, its view is not blocked; it can see __`2`__ trees.
- Looking down, its view is also not blocked; it can see __`1`__ tree.
- Looking right, its view is blocked at __`2`__ trees (by a massive tree of height `9`).

This tree's scenic score is __`8`__ (`2 * 2 * 1 * 2`); this is the ideal spot for the tree house.

Consider each tree on your map. __What is the highest scenic score possible for any tree?__