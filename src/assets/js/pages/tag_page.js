/**
 * タグ画面
 */
var modules = modules || {};
modules.pages = modules.pages || {};

modules.pages.tag = (function () {
  var page = {}

  var storage = null;
  try{
    storage = $.localStorage;
  }catch(e){
    console.log(e);
    toastr.error('ローカルストレージが使用できないため、機能が正しく動きません。');
  }

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
    // var text = $('#header h1 a').text();
    // $('#header h1 a').html(modules.helper.eachTopCharUpper(text, '<span style="color: #21b2a6">', '</span>'));
  };

  /**
   * イベントの初期処理
   */
  page.initAction = function(){
    $('#regist-btn').on('click', function(){
      $('#tag1-name').val(getVal($('#tag1-name').val(), 'タグ1'));
      $('#tags1').val(modules.helper.formatTag($('#tags1').val()));

      $('#tag2-name').val(getVal($('#tag2-name').val(), 'タグ2'));
      $('#tags2').val(modules.helper.formatTag($('#tags2').val()));

      $('#tag3-name').val(getVal($('#tag3-name').val(), 'タグ3'));
      $('#tags3').val(modules.helper.formatTag($('#tags3').val()));

      $('#tag4-name').val(getVal($('#tag4-name').val(), 'タグ4'));
      $('#tags4').val(modules.helper.formatTag($('#tags4').val()));

      function getVal(val, defaultVal){
        if(!val || val.length == 0){ return defaultVal; }
        return val;
      }

      page.saveSettings();

      toastr.info('タグを保存しました。');
    });
  };

  /**
   * ストレージの状態を画面に反映
   */
  page.loadSetting = function(){
    if(!storage.isSet(keys.tag_list)){
      modules.storage_helper.setDefaultTags(storage);
      toastr.info('初期値を設定しました。');
    }

    const tagList = JSON.parse(storage.get(keys.tag_list));

    $('#tag1-name').val(tagList['tag1_name']);
    $('#tags1').val(tagList['tags1']);
    $('#tag2-name').val(tagList['tag2_name']);
    $('#tags2').val(tagList['tags2']);
    $('#tag3-name').val(tagList['tag3_name']);
    $('#tags3').val(tagList['tags3']);
    $('#tag4-name').val(tagList['tag4_name']);
    $('#tags4').val(tagList['tags4']);
  }

  /**
   * 設定をストレージに保存する
   */
  page.saveSettings = function(){
    var settings = {
      tag1_name: $('#tag1-name').val(),
      tags1: $('#tags1').val(),
      tag2_name: $('#tag2-name').val(),
      tags2: $('#tags2').val(),
      tag3_name: $('#tag3-name').val(),
      tags3: $('#tags3').val(),
      tag4_name: $('#tag4-name').val(),
      tags4: $('#tags4').val(),
  }

    // 設定の保持
    storage.set(keys.tag_list, JSON.stringify(settings));
  }

  return page;
}());