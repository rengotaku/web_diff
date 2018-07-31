/**
 * 画面の操作ヘルパー
 */
var modules = modules || {};

modules.storage_helper = (function () {
  var module = {}

  module.versions = {
    v1_0_0: {name: "v1.0.0"},
  };

  module.namespace = "icm";

  module.keys = {
    settings: module.namespace + ".settings",
    tag_list: module.namespace + ".tag_list",
    version: module.namespace + ".version",
  };

  module.version = module.versions.v1_0_0.name;

  /**
   * ローカルストレージを安全に取り出す
   */
  module.getStorage = function(){
    try{
      const storage = $.localStorage;

      for (key in module.keys) {
        if(!storage.isSet(module.keys[key])){
          storage.set(module.keys[key], null);
        }
      }

      return storage;
    }catch(e){
      console.log(e);
      return null;
    }
  }

  /**
   * 基本値デフォルト値を設定
   */
  module.setDefaultSettings = function(storage){
    var data = {
      template: "##CAP##\n\n##TAGS##",
      new_line: "・",
      tag_list: "one",
      select_tag_num: "",
      tag_per_line: false,
      random_order: false,
      emoji: "",
      version: module.keys.version,
    }

    // 設定の保持
    storage.set(module.keys.settings, JSON.stringify(data));
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
    storage.set(module.keys.tag_list, JSON.stringify(data));
  }

  /**
   * タグのデフォルト値を設定
   */
  module.getItem = function(storage, defaultVal=null){
    var val = storage.getItem(keys.tag_list);
    if(!val){ return defaultVal; }

    return JSON.parse(storage.getItem(keys.tag_list));
  }

  return module;
}());