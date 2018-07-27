function markdown(code) {
  const inln = "";    /* inline rule */
  const whln = "\n";  /* whole line rule*/

  /*
    p0  group which will always be printed
    p1  ACTUAL TEXT
    p2  a/img src/href
    p3  img title
  */

  const makeTag =
    (tag, mode, p0, value, p2, p3) => p0 + (tag == "img_with_title"
      ? "<img alt=\"" + value + "\" src=\"" + p2 + "\" title=\"" + p3 + "\" />"
      : tag == "img_without_title"
        ? "<img alt=\"" + value + "\" src=\"" + p2 + "\" />"
        : tag == "a"
          ? "<a href=\"" + p2 + "\">" + value + "</a>"
          : typeof value == "string"
            ? "<" + tag + ">" + value + "</" + tag + ">"
            : "<" + tag + " />") + mode;

  const applyRules = 
    (str, arr) =>
      arr.reduce((prev, cur) =>
        prev.replace(new RegExp(cur[0], "g"), /* str.replace(rule, tag) */
                     (a, p0, p1, p2, p3) => makeTag(cur[1], cur[2], p0, p1, p2, p3)), str);
  
  code = "\n" + code;

  return applyRules(code, [
    ["(\n)[ \t]*######[ \t]*(.*?)\n", "h6", whln], 
    ["(\n)[ \t]*#####[ \t]*(.*?)\n", "h5", whln],
    ["(\n)[ \t]*####[ \t]*(.*?)\n", "h4", whln],
    ["(\n)[ \t]*###[ \t]*(.*?)\n", "h3", whln],
    ["(\n)[ \t]*##[ \t]*(.*?)\n", "h2", whln],
    ["(\n)[ \t]*#[ \t]*(.*?)\n", "h1", whln],
    ["(\n)\\*{3,}\n", "hr", whln],
    ["(\n)_{3,}\n", "hr", whln],
    ["([^\\\\])\\*\\*(.*?[^\\\\])\\*\\*", "b", inln],
    ["([^\\\\])\\*(.*?[^\\\\])\\*", "i", inln],
    ["([^\\\\])__(.*?[^\\\\])__", "b", inln],
    ["([^\\\\])_(.*?[^\\\\])_", "i", inln],
    ["([^\\\\])~~(.*?[^\\\\])~~", "s", inln],
    ["(\n)(.*?)\n=+?\n", "h1", whln],
    ["(\n)(.*?)\n-+?\n", "h2", whln]]);
}
