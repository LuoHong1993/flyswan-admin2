import Ajax from './ajax';

const Request = {
  User: {
    info () {
      return Ajax.get('/sys/user/info');
    }
  },
  Role: {
    getMenuIdByRole (param) {
      return Ajax.post('/sys/role/getMenuIdByRole',param);
    },
    saveRoleMenu (param) {
      return Ajax.post('/sys/role/saveRoleMenu',param);
    }
  },
  Dict: {
    get () {
      return Ajax.get(`/dict`);
    }
  },
  Home: {
    getMessageList () {
      return Ajax.get('/sys/message/list');
    }
  },
  Login: {
    login (param) {
      return Ajax.post('/authentication/from', param);
    },
    logout (param) {
      return Ajax.post('/logout', param);
    }
  },
  Menu: {
    list () {
      return Ajax.get('/sys/menu/list');
    },
    commonlist () {
      return Ajax.get('/sys/menu/commonlist');
    },
    getMenuItemById (param) {
      return Ajax.post('/sys/menu/getMenuItemById', param);
    },
    save (param) {
      return Ajax.post('/sys/menu/save', param);
    },
    delete (param) {
      return Ajax.post('/sys/menu/delete', param);
    },
    getMaxPri (param) {
      return Ajax.post('/sys/menu/getMaxPri', param);
    },
    isExistCode (param) {
      return Ajax.post('/sys/menu/isExistCode', param);
    },
    isExistPri (param) {
      return Ajax.post('/sys/menu/isExistPri', param);
    }
  },
  RouterConfig: {
    list () {
      return Ajax.get('/sys/menu/router-config');
    }
  }
};

export default Request;
