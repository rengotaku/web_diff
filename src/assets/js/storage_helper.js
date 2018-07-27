/**
 * 画面の操作ヘルパー
 */
var modules = modules || {};

modules.storage_helper = (function () {
  var module = {}

  module.keys = {
    settings: "settings",
    tag_list: "tag_list",
  };

  /**
   * ローカルストレージを安全に取り出す
   */
  module.getStorage = function(){
    try{
      if(!('localStorage' in window) && (window.localStorage == null)) {
        throw new Error('LSが使用できません。');
      }

      return localStorage;
    }catch(e){
      console.log(e);
      // FIXME: ここで、このエラーを出すのは、いけすかない
      toastr.error('LSが使用できないため、保存はできません。');

      // FIXME: 使えないなら動作を止めた方がよい？
      return {
        getItem: function(key, val){},
        setItem: function(key){},
        removeItem: function(key){},
        clearItem: function(){},
      }
    }
  }

  /**
   * 基本値デフォルト値を設定
   */
  module.setDefaultSettings = function(storage){
    var data = {
      template: "##MSG##\n\n##TAGS##",
      new_line: "・",
      tag_list: "one",
      select_tag_num: "",
      tag_per_line: false,
      random_order: false,
    }

    // 設定の保持
    storage.setItem(module.keys.settings, JSON.stringify(data));
  }

  /**
   * タグのデフォルト値を設定
   */
  module.setDefaultTags = function(storage){
    var data = {
      tag1_name: "タグ1",
      tags1: "#sample #sample2 #sample3",
      tag2_name: "タグ2",
      tags2: "",
      tag3_name: "タグ3",
      tags3: "",
      tag4_name: "タグ4",
      tags4: "",
    }

    // 設定の保持
    storage.setItem(module.keys.tag_list, JSON.stringify(data));
  }


  return module;
}());