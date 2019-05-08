import defalutcomponets from './defalut-componets';
import Ajax from '../common/ajax';

const routerServiceConfig = async () => {
  let routerConfig = [];
  routerConfig = defalutcomponets;
  let res = await Ajax.get('/sys/menu/list');
  if (res.ok) {
    if (res.code === 0) {
      if (res.data != null && res.data.length > 0) {
        let buildList = [];
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          let buildConfigs = buildConfig(item);
          if (buildConfigs !== null && buildConfigs !== {} && JSON.stringify(buildConfigs) !== '{}') {
            buildList.push(buildConfigs);
          }
          if (item.children != null && item.children.length > 0) {
            for (let j = 0; j < item.children.length; j++) {
              let buildConfigs2 = buildConfig(item.children[j]);
              if (buildConfigs2 !== null && buildConfigs2 !== {} && JSON.stringify(buildConfigs2) !== '{}') {
                buildList.push(buildConfigs2);
              }
            }
          }
        }
        buildList.push(defalutcomponets[0].children[1]);
        buildList.push(defalutcomponets[0].children[2]);
        buildList.push(defalutcomponets[0].children[3]);
        buildList.push(defalutcomponets[0].children[4]);
        routerConfig = [{
          path: '/',
          component: (resolve) => require(['components/app/app-frame'], resolve),
          children: buildList
        }];
      }
    }
  }
  return routerConfig;
};
const buildConfig = (data) => {
  let buildMap = {};
  let rpath = data.path;
  const rcomponent = data.component;
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

export default routerServiceConfig;
