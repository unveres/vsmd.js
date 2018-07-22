function markdown(code) {
  const makeTag =
    (tag, value) => !!value
      ? "\n<" + tag + "/>\n"
      : "\n<" + tag + ">" + value + "</" + tag + ">\n";

  const md2html = 
    (str, arr) =>
      [...Array(arr.length).keys()]
      .map(x => ["".replace, arr[x][0], arr[x][1]])
      .reduce((prev, cur) =>
        cur[0].call(prev,                    /* str.replace(rule, tag) */
                    new RegExp(cur[1], "img"), 
                    (a, b) => makeTag(cur[2], b)), str);
  
  code = "\n" + code;

  return md2html(code, [
    ["\n[ \t]*######[ \t]*(.*)\n", "h6"], 
    ["\n[ \t]*#####[ \t]*(.*)\n", "h5"],
    ["\n[ \t]*####[ \t]*(.*)\n", "h4"],
    ["\n[ \t]*###[ \t]*(.*)\n", "h3"],
    ["\n[ \t]*##[ \t]*(.*)\n", "h2"],
    ["\n[ \t]*#[ \t]*(.*)\n", "h1"],
    ["[^\\\\]\\*\\*(.*?[^\\\\])\\*\\*", "b"],
    ["[^\\\\]\\*(.*?[^\\\\])\\*", "i"],
    ["[^\\\\]__(.*?[^\\\\])__", "b"],
    ["[^\\\\]_(.*?[^\\\\])_", "i"],
    ["[^\\\\]~~(.*?[^\\\\])~~", "s"]
      ]);
}

/* basics implemented */
