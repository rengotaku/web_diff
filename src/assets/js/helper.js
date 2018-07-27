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
  module.getStrage = function(){
    try{
      if(('localStorage' in window) && (window.localStorage !== null)) {
        return localStorage;
      } else {
        toastr.error('ローカルストレージが使用できません。');
        return {
          getItem: function(key, val){},
          setItem: function(key){},
        }
      }
    }catch(e){
      toastr.error('ローカルストレージが使用できません。');
      return {
        getItem: function(key, val){},
        setItem: function(key){},
      }
    }
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

  return module;
}());