/**
 * タグ変換ヘルパー
 */
var modules = modules || {};

modules.replace_helper = (function () {
  var module = {}

  module.marks = {
    msg: "##CAP##",
    tag: "##TAGS##",
    dot: "。",
  };


  /**
   * メッセージを置換する
   */
  module.replaceMessage = function(templateStr, msgStr){
    return templateStr.replace(new RegExp(module.marks.msg), msgStr);
  }

  /**
   * タグを置換する
   */
  module.replaceTag = function(templateStr, tagStr){
    return templateStr.replace(new RegExp(module.marks.tag), tagStr);
  }

  /**
   * 区切り文字を置換する
   */
  module.replaceDot = function(templateStr, emojiStr){
    var emojis = stringToArray(emojiStr);

    while(templateStr.match(new RegExp(module.marks.dot))){
      var targetPosition = Math.floor(Math.random()*emojis.length);
      var emoji = emojis[targetPosition];

      templateStr = templateStr.replace(new RegExp(module.marks.dot), emoji);
    }

    // https://qiita.com/YusukeHirao/items/2f0fb8d5bbb981101be0
    function stringToArray (str) {
      return str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
    }

    return templateStr;
  }

  /**
   * 改行を指定の文字列に変換
   */
  module.replaceNewLine = function(templateStr, newLineStr){
    var lines = templateStr.split(/\r?\n/g);
    lines.forEach(function(val, i, ar){
      if(val.length == 0){
        ar[i] = newLineStr;
      }
    });

    return lines.join('\n');
  }

  /**
   * タグを持っているか？
   */
  module.hasTags = function(str){
    return str.match(new RegExp(module.marks.tag));
  }


  return module;
}());