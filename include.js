const { writeFileSync: write, readFileSync: read, watch } = require("fs");
const config = require("./.iConfig.json");

let defaultConfigs = {
  src: "./main.html",
  dist: "./index.html",
  watch: false,
  pattern: /<include.*?<\/\s*?include\s*?>/gs,
  basePath: __dirname,
};
const Configs = Object.assign(defaultConfigs, config);

const SRC_PATH = Configs.src;
const DIST_PATH = Configs.dist;
const PATERN = Configs.pattern;
const isWatached = Configs.watch;
const BASE_PATH = Configs.basePath;

function _getClassName(tag) {
  //define type of quotes
  let quote = tag.includes('"') ? '"' : tag.includes("'") ? "'" : false;
  if (!quote) {
    throw new Error('the virtual tag "include" must have a class name');
  }
  let start = tag.indexOf(quote) + 1;
  let end = tag.lastIndexOf(quote);
  return tag.slice(start, end).trim();
}
function getPathsArrayFromClassNames(tags) {
  return tags.map(
    (tag) => BASE_PATH + "/ihtmls" + "/" + _getClassName(tag) + ".html"
  );
}

//the file in which must be replaced <include> tag[s]
function includer(path, pattern) {
  let file = read(path, "utf8");
  let virtualIncludeTags;

  if ((virtualIncludeTags = file.match(pattern))) {
    getPathsArrayFromClassNames(virtualIncludeTags).forEach((path, index) => {
      //if included File also include file(i.e. <include> tag) then will be recursion
      file = file.replace(virtualIncludeTags[index], includer(path, pattern));
    });
  }
  return file;
}

write(DIST_PATH, includer(SRC_PATH, PATERN));

console.log("\x1b[36m%s\x1b[0m", "success!");

let count = 0;

//when pressing Ctrl+S  the files changed four time. Why?
if (isWatached) {
  watch(SRC_PATH, (e, n) => {
    console.log("from outer if block");
    ++count;
    if (count === 3) {
      count = 0;
      console.log("\x1b[36m%s\x1b[0m", "success!"); //cyan
      write(DIST_PATH, includer(SRC_PATH, PATERN));
    }
  });
}
