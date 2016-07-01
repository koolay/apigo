import {combineReducers} from 'redux';
import {routerReducer as routing } from 'react-router-redux';

import tip from './modules/tip';
import main from './modules/main';

import binDefine from './modules/bin/define';
import binList from './modules/bin/list';

import indicatorList from './modules/examples/indicator/list';
import imageList from './modules/examples/360image/list';
import imageDetail from './modules/examples/360image/detail';
import tagList from './modules/examples/tag/list';
import tagAddOrEdit from './modules/examples/tag/addOrEdit';

import mockList from './modules/mock/list';
import mockCreate from './modules/mock/create';


const rootReducer = combineReducers({
	tip,
  main,
  binDefine,
  binList,
  indicatorList,
  imageList,
  imageDetail,
  tagList,
  tagAddOrEdit,
  mockList,
  mockCreate,
  routing //routing，这个Key值不能变，在redux-simple-router.syncHistory(history).listenForReplays(store)会用到
})

export default rootReducer;
