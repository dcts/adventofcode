const year = "2022";
const day = "14";

const { input } = require(`./${year}/${day}/input.js`);

const { Cave } = require("./2022/14/Cave");

const rocks = input;

const c = new Cave(rocks);

