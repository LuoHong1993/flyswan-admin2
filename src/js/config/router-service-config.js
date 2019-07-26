import defalutcomponets from './defalut-componets';
import store from '../vuex/store';

const routerServiceConfig = async () => {
  let routerConfig = [];
  routerConfig = defalutcomponets;
  let res = await R.Menu.list();
  if (res.ok) {
    if (res.code === 0) {
      if (res.data != null && res.data.length > 0) {
        let buildList = [];
        buildList = analysisData(res.data);
        buildList.push(defalutcomponets[0].children[1]);
        buildList.push(defalutcomponets[0].children[2]);
        buildList.push(defalutcomponets[0].children[3]);
        buildList.push(defalutcomponets[0].children[4]);
        routerConfig = [{
          path: '/',
          component: (resolve) => require(['components/app/app-frame'], resolve),
          children: buildList
        }];
        store.dispatch('updateMenu', res.data);
      }
    }
  }
  return routerConfig;
};

const analysisData = (data) => {
  let buildList = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let buildConfigs = buildConfig(item);
    if (buildConfigs !== null && buildConfigs !== {} && JSON.stringify(buildConfigs) !== '{}') {
      buildList.push(buildConfigs);
    }
    if (item.children != null && item.children.length > 0) {
      buildList.push(...analysisData(item.children));
    }
  }
  return buildList;
};
const buildConfig = (data) => {
  let buildMap = {};
  let rpath = data.path;
  const rcomponent = data.type === '2' ? 'components/other/iframe' : data.component;
  let rtitle = data.title == null ? '' : data.title;
  let ricon = data.icon;
  let rkey = data.key;
  if (rpath !== null && rkey !== null) {
    if (rcomponent !== null && rcomponent !== '') {
      buildMap['path'] = rpath;
      buildMap['name'] = rkey;
      let pathSrc = rcomponent;
      buildMap['component'] = (resolve) => require([`@/${pathSrc}.vue`], resolve);
      let metaMap = { title: rtitle };
      if (ricon !== null && ricon !== '') {
        metaMap['icon'] = ricon;
      }
      buildMap['meta'] = metaMap;
    }
  }

  return buildMap;
};
const getKeys = function (menus) {
  let keys = [];
  for (let menu of menus) {
    keys.push(menu.key);
    if (menu.children && menu.children.length) {
      keys.push(...getKeys(menu.children));
    }
  }
  return keys;
};
const isHasMenu = (data) => {
  let menus = store.state.Menus;
  let fullMenuKeys = getKeys(menus);
  if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
    return false;
  }
  return true;
};

export { routerServiceConfig, isHasMenu };
