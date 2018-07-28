function markdown(code) {
  /*
    ord    ordinary text, always printed
    value  formatted text
    src    src/href
    title  img title
  */

  const getStr =
    (obj) => Object.prototype.toString.call(obj) === '[object String]' ? obj : "";

  const makeTag =
    (tag, ord, value, src, title) => ord + (tag == "img_with_title"
      ? "<img alt=\"" + value + "\" src=\"" + src + "\" title=\"" + title + "\" />"
      : tag == "img_without_title"
        ? "<img alt=\"" + value + "\" src=\"" + src + "\" />"
        : tag == "a"
          ? "<a href=\"" + src + "\">" + value + "</a>"
          : getStr(value)
            ? "<" + tag + ">" + value + "</" + tag + ">" + getStr(src)
            : "<" + tag + " />"+ getStr(src));

  const applyRules = 
    (str, arr) =>
      arr.reduce((prev, cur) =>
        prev.replace(new RegExp(cur[0], "g"), /* str.replace(rule, tag) */
                     (a, p0, p1, p2, p3) => makeTag(cur[1], p0, p1, p2, p3)), str);
  
  code = "\n" + code + "\n";

  return applyRules(code, [
    ["(\n)[ \t]*######[ \t]*(.*)", "h6"], 
    ["(\n)[ \t]*#####[ \t]*(.*)", "h5"],
    ["(\n)[ \t]*####[ \t]*(.*)", "h4"],
    ["(\n)[ \t]*###[ \t]*(.*)", "h3"],
    ["(\n)[ \t]*##[ \t]*(.*)", "h2"],
    ["(\n)[ \t]*#[ \t]*(.*)", "h1"],
    ["(\n)\\*{3,}()", "hr"],
    ["(\n)_{3,}()", "hr"],
    ["([^\\\\])\\*\\*(.*?[^\\\\])\\*\\*", "b"],
    ["([^\\\\])\\*(.*?[^\\\\])\\*", "i"],
    ["([^\\\\])__(.*?[^\\\\])__", "b"],
    ["([^\\\\])_(.*?[^\\\\])_", "i"],
    ["([^\\\\])~~(.*?[^\\\\])~~", "s"],
    ["(\n)(.*?)\n[ \t]*=+[ \t]*(\n)", "h1"],
    ["(\n)(.*?)\n[ \t]*-+[ \t]*(\n)", "h2"]]).slice(1, -1);
}
