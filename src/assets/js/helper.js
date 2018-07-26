/**
 * 画面の操作ヘルパー
 */
var modules = modules || {};

modules.helper = (function () {
  var module = {}

  /**
   * abc defg hij -> [a]bc [d]efg [h]ij
   * のように各要素の先頭文字をタグつけする
   */
  module.eachTopCharUpper = function(str, startTag, endTag){
    var strAry = str.split(' ');
    strAry.forEach(function(val,i,ar){
       if(val.length == 0){ return; }
       ar[i] = startTag + val.substr(0, 1) + endTag + val.substr(1, val.length);
    });

    return strAry.join(' ');
  }

  return module;
}());