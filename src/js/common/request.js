import Ajax from './ajax';

const Request = {
  User: {
    info () {
      return Ajax.get('/sys/user/info');
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
    }
  },
  RouterConfig: {
    list () {
      return Ajax.get('/sys/menu/router-config');
    }
  }
};

export default Request;
