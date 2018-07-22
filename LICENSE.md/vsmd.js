function markdown(code) {
  const makeTag =
    (tag, value) => "<" + tag + ">" + value + "</" + tag + ">";

  const applyMarkdownRules = 
    (str, arr) =>
      [...Array(arr.length).keys()]
      .map(x => ["".replace, arr[x][0], arr[x][1]])
      .reduce((prev, cur) =>
        cur[0].call(prev,                    /* str.replace(rule, tag) */
                    new RegExp(cur[1], "g"), 
                    (a, b) => makeTag(cur[2], b)), str);
    
  return applyMarkdownRules(code, [
    ["####(.*)\n", "h4"],
    ["###(.*)\n", "h3"],
    ["##(.*)\n", "h2"],
    ["#(.*)\n", "h1"],
  ])
}

/*test*/
markdown("XDD\nhehe\n#xd\n##XD\n#\n");

/* now I must apply all known markdown rules */
