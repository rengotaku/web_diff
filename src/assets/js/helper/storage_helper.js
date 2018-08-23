/**
 * ローカルストレージ操作ヘルパー
 */
var modules = modules || {};

modules.storage_helper = (function () {
  var module = {}

  module.versions = {
    v1_0_0: {name: "v1.0.0"},
  };

  module.namespace = "bdiff";

  module.keys = {
    settings: module.namespace + ".settings",
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
   * ローカルストレージを安全に取り出す
   */
  module.initData = function(storage){
    for (key in module.keys) {
      storage.set(module.keys[key], null);
    }
  }

  return module;
}());