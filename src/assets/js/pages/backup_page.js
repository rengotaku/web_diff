/**
 * バックアップ画面
 */
var modules = modules || {};
modules.pages = modules.pages || {};

modules.pages.backup = (function () {
  var page = {}

//   var storage = null;
//   try{
//     ns=$.initNamespaceStorage('icm');
//     storage = ns.localStorage;
//   }catch(e){
//     console.log(e);
//     // FIXME: ここで、このエラーを出すのは、いけすかない
//     toastr.error('ローカルストレージが使用できないため、機能が正しく動きません。');
//   }
// console.log(storage.keys());
  const keys = modules.storage_helper.keys;

  page.init = function(){
    page.initLayout();

    page.initAction();

    page.loadSetting();
  }

  /**
   * レイアウトの初期処理
   */
  page.initLayout = function(){
  };

  /**
   * イベントの初期処理
   */
  page.initAction = function(){
  };

  /**
   * ストレージの状態を画面に反映
   */
  page.loadSetting = function(){
  }

  return page;
}());