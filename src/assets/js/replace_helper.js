/**
 * タグ変換ヘルパー
 */
var modules = modules || {};

modules.replace_helper = (function () {
  var module = {}

  module.marks = {
    msg: "##MSG##",
    tag: "##TAGS##",
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