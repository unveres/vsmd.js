function markdown(code) {
  const makeTag =
    (tag, value) => typeof value == "string"
      ? "<" + tag + ">" + value + "</" + tag + ">"
      : "<" + tag + " />";

  const applyRules = 
    (str, arr) =>
      [...Array(arr.length).keys()]
      .map(x => ["".replace, arr[x][0], arr[x][1]])
      .reduce((prev, cur) =>
        cur[0].call(prev,                    /* str.replace(rule, tag) */
                    new RegExp(cur[1], "img"), 
                    (a, b) => makeTag(cur[2], b)), str);
  
  code = "\n" + code;

  return applyRules(code, [
    ["\n[ \t]*######[ \t]*(.*?)\n", "h6"], 
    ["\n[ \t]*#####[ \t]*(.*?)\n", "h5"],
    ["\n[ \t]*####[ \t]*(.*?)\n", "h4"],
    ["\n[ \t]*###[ \t]*(.*?)\n", "h3"],
    ["\n[ \t]*##[ \t]*(.*?)\n", "h2"],
    ["\n[ \t]*#[ \t]*(.*?)\n", "h1"],
    ["\n\\*{3,}\n", "hr"],
    ["\n_{3,}\n", "hr"],
    ["[^\\\\]\\*\\*(.*?[^\\\\])\\*\\*", "b"],
    ["[^\\\\]\\*(.*?[^\\\\])\\*", "i"],
    ["[^\\\\]__(.*?[^\\\\])__", "b"],
    ["[^\\\\]_(.*?[^\\\\])_", "i"],
    ["[^\\\\]~~(.*?[^\\\\])~~", "s"],
    ["\n(.*?)\n=+?\n", "h1"],
    ["\n(.*?)\n-+?\n", "h2"]]);
}
