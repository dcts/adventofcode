// ADVENTOFCODE README SCRAPER
// scrape whole puzzle descirption and transform it to a markdown
// string.

// Part1 and Part2 are <article> tags
// extractFromArticle extracts markdown 
// from the contents of an article tag
function extractFromArticle(articleEl) {
  const results = [];
  Array.from(articleEl.children).forEach(child => { // child = html element
    if (child.tagName === "H2" && !child.textContent.includes("Part Two")) {
      results.push(extractTitle(child.textContent));

    } else if (child.tagName === "P") {
      results.push(extractText(child.innerHTML));
    
    } else if (child.tagName === "PRE") {
      results.push(extractCodeblock(child))
      
    } else if (child.tagName === "UL") {
      results.push(extractUnorderedList(child))
      
    } else {
      if (child.tagName != "H2") {
        throw new Error(`New TAG found: <${child.tagName}>. Please fix code first to not loose information!`);
      }
    }
  })
  return results.join("\n\n");
}

function extractText(str) {
  return str
    .split(/<code[^>]*><em[^>]*>/gm).join("__`") // fix swapped ordering
    .split("</em></code>").join("`__") // fix swapped ordering
    .split(/<em[^>]*>/gm).join("__") // emphasis = bold
    .split("</em>").join("__")
    .split(/<code[^>]*>/gm).join("`") // code = inline codeblock
    .split("</code>").join("`")
    .split(/<span[^>]*>/gm).join("") // remove spans
    .split("</span>").join("")
    .replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/g, "[$2]($1)"); // replace <a> tags // https://stackoverflow.com/a/68782732/6272061
}

function extractCodeblock(pre) {
  const indendation = "    ";
  const content = pre.textContent.trim().split("\n").join(`\n${indendation}`);
  return `${indendation}${content}`;
}

// !!! WARNING !!!
// recursion only works for 2 indendations, if you
// have a <ul> with 3 sub-lists then this will break
// (keeping currently as solution since tripple indendation 
// seems rare and unlikely)
function extractUnorderedList(ul) {
  const elements = extractUnorderedListElements(ul);
  return elements.map(el => listElement2str(el)).flat().join("\n");
}
function extractUnorderedListElements(ul) {
  const elements = [];
  const lis = Array.from(ul.children).filter(child => child.tagName === "LI");
  lis.forEach(li => {
    const nestedUl = li.querySelector("ul");
    const str = li.innerHTML.split("<ul>")[0];
    elements.push(extractText(str));
    if (nestedUl) {
      const nestedUlStr = extractUnorderedListElements(nestedUl);
      elements.push(nestedUlStr);
    } 
  })
  return elements;
}
function listElement2str(arrayOrStr, indendation = 0) {
  if (typeof(arrayOrStr) === "string") { // single list element
    const content = arrayOrStr.trim();
    const preStr = Array(indendation).fill(" ").join("");
    return `${preStr}- ${content}`;
  }
  if (typeof(arrayOrStr) === "object") { // we assume its an array
    const array = arrayOrStr;
    return array.map(element => listElement2str(element, indendation + 2));
  }
}

// UTILS
function downloadFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function copyToClipboard(str) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", str);
}

function splitResultStr(resultStr) {
  try {
    return resultStr.split("Your puzzle answer was ")[1].split(".")[0].trim();
  } catch(err) {
    return undefined;
  }
};
function getYourResults() {
  const resultStrings = Array.from(document.querySelectorAll("p"))
    .map(p => p.textContent)
    .filter(str => str.startsWith("Your puzzle answer was"));
  const result1 = splitResultStr(resultStrings[0]) || "ANSWER1";
  const result2 = splitResultStr(resultStrings[1]) || "ANSWER2";
  return [result1, result2];
};

function extractTitle(fullTitle){
  const [result1, result2] = getYourResults();
  const reslen1 = Math.max(6, result1.toString().length + 2);
  const reslen2 = Math.max(6, result2.toString().length + 2);
  const residual1 = reslen1 - result1.toString().length - 2;
  const residual2 = reslen2 - result2.toString().length - 2;
  const dottedLines1 = "-".repeat(reslen1);
  const dottedLines2 = "-".repeat(reslen2);
  return `# Answers

| ${"Part 1".padEnd(reslen1, " ")} | ${"Part 2".padEnd(reslen2, " ")} |
| ${dottedLines1} | ${dottedLines2} |
| \`${result1}\`${" ".repeat(residual1)} | \`${result2}\`${" ".repeat(residual2)} |

## ${fullTitle}`;
}

const titleSectionPart2 = `-----------------

## --- Part Two ---`;


/**
 * RUN SCRAPER SCRIPT
 */
const components = [];
articles = document.querySelectorAll("article.day-desc");
part1 = articles[0];
part2 = articles[1];
components.push(extractFromArticle(part1))
if (part2) {
  components.push(titleSectionPart2);
  components.push(extractFromArticle(part2));
}
const readmeMD = components.join("\n\n");
const [year, _, day] = location.href.split("adventofcode.com/")[1].split("/");
downloadFile(`README_${year}_day${day}.md`, readmeMD);

// // alternative: copy full markup content to clipboard
// copyToClipboard(readmeMD);

