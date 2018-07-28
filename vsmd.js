/* VSMD.JS - Very Short Markdown implementation for JavaScript */
/* by Mateusz Ezechiel Górka (unveres), 2018 */
/* v0.1 */

const markdown = (code) => {
  const getStr = (obj) =>
    Object.prototype.toString.call(obj) === '[object String]' ? obj : "";

  /*
    tag    tag name
    ord    ordinary text, always printed
    value  formatted text
    src    src/href
    title  img title
  */

  const makeTag = (tag, ord, value, src, title) =>
    ord.concat(/* functional switch */ false?""
      /*: tag == "img_with_title"
      ? "<img alt=\"" + value + "\" src=\"" + src + "\" title=\"" + title + "\" />"
      : tag == "img_without_title"
      ? "<img alt=\"" + value + "\" src=\"" + src + "\" />"
      : tag == "a_with_title"
      ? "<a href=\"" + src + "\" title=\"" + title + "\" >" + value + "</a>"
      : tag == "a_without_title"
      ? "<a href=\"" + src + "\">" + value + "</a>"*/
      : tag == "bi"
      ? "<b><i>" + value + "</i></b>"
      : getStr(value)
      ? "<" + tag + ">" + value + "</" + tag + ">" + getStr(src)
      : "<" + tag + " />"+ getStr(src));

  const applyRules = (str, arr) =>
    arr.reduce((prev, cur) =>
      prev.replace(new RegExp(cur[0], "mg"), /* str.replace(rule, tag) */
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
    ["([^\\\\])\\*\\*\\*(.*?[^\\\\])\\*\\*\\*", "bi"],
    ["([^\\\\])\\*\\*(.*?[^\\\\])\\*\\*", "b"],
    ["([^\\\\])\\*(.*?[^\\\\])\\*", "i"],
    ["([^\\\\])___(.*?[^\\\\])___", "bi"],
    ["([^\\\\])__(.*?[^\\\\])__", "b"],
    ["([^\\\\])_(.*?[^\\\\])_", "i"],
    ["([^\\\\])~~(.*?[^\\\\])~~", "s"],
    ["(\n)(.*?)\n[ \t]*=+[ \t]*(\n)", "h1"],
    ["(\n)(.*?)\n[ \t]*-+[ \t]*(\n)", "h2"],
    ["\\!\\[(.*?)\\]\\((\S*?)\\)", "img_with_title"]]).slice(1, -1);
}
