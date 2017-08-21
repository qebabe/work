import { SA } from '../../selectarea/selectarea';

const conf = {
  onLoad: function (options) {

    // 若只需省市两级联动，加入配置项，默认为true(省市区三级联动)，可不传:

    const conf = {
      showDistrict: false // 省市两级
    }
    SA.load(this[conf]);

  },
  choosearea() { // 页面弹框触发事件
    SA.choosearea(this);
  },
  tapProvince(e) { // 点击省份
    SA.tapProvince(e, this);
  },
  tapCity(e) { // 点击城市
    SA.tapCity(e, this);
  },
  tapDistrict(e) { // 点击区域
    SA.tapDistrict(e, this);
  },
  cancel() { // 取消选择
    SA.cancel(this);
  },
  confirm(e) { // 确认选择区域
    SA.confirm(e, this);
  }
}

Page(conf);