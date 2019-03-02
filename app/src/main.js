import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import AMap from 'vue-amap';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: "fe6861f96e8731d9002a3df50599d962",
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder"
  ],
  uiVersion: "1.0"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
