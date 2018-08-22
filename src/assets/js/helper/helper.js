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
  module.decorateEachChar = function(str, colorCodes){
    var maxCodeNum = colorCodes.length - 1;
    var count = 0;
    var strAry = Array.from(str);
    strAry.forEach(function(val,i,ar){
      if(val.length == 0 || val.match(/\s/)){ return; }
      var colorCode = colorCodes[count];
      ar[i] = "<span style='color:#" + colorCode + "'>" + val + "</span>";
      count = count++ >= maxCodeNum ? 0 : count;
    });

    return strAry.join('');
  }

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

  /**
   * ＃or空白区切りの文字列を「#1#2#3」の形式で返却する
   */
  module.formatTag = function(str){
    if(!str || str.length == 0){ return ""; }

    // 前後の空白を削除
    str = str.replace(/^\s+/, '');
    str = str.replace(/\s*$/, '');

    // 先頭に必ず＃をつける
    str = "#" + str.replace(/^#/, '');

    str = str.replace(/#/g, ' ');
    str = str.replace(/\s+/g, '#');

    // 余っている＃を削除
    str = str.replace(/#$/g, '');
    return str;
  }

  /**
   * 空白、タグ、改行を除去した文字列を返却
   */
  module.excludeBlank = function(str){
    if(!str || str.length == 0){ return ""; }

    return str.replace(/\s|\n|\t/g, '');
  }


  /**
   * コピーする
   * https://qiita.com/simiraaaa/items/2e7478d72f365aa48356
   */
  module.execCopy = function(string){
    var temp = document.createElement('div');

    temp.appendChild(document.createElement('pre')).textContent = string;

    var s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';

    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);

    var result = document.execCommand('copy');

    document.body.removeChild(temp);
    // true なら実行できている falseなら失敗か対応していないか
    return result;
  }

  return module;
}());