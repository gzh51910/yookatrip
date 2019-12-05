
// 使用saga需要考虑两个问题
// 1. 如何监听用户操作(如：购物车数量修改)
// 2. 如何等待异步操作的结果返回，并触发reducer修改

import {takeLatest,call,put} from 'redux-saga/effects'
import {my} from '../../api';



function* getInventory({payload}){
    // 发起ajax请求，请求商品库存

    // 为了方便单元测试，使用以下写法（由于使用yield，saga会等待异步请求的结果，结果返回后内部制动执行next()）
    const {yuwei:kc} = yield call(my.get,`/activity`,{id:payload.id});

    // 把商品数量与库存进行对比
    if(payload.goods_qty>kc){
        payload.goods_qty = kc
    }

    // 利用saga提供的put（等效与dispatch）方法触发reducerAction
    yield put({type:'CHANGE_GOODS_QTY',payload})
}


// function* removeShop(){
//     // 发起ajax请求，清空购物车

//     // 为了方便单元测试，使用以下写法（由于使用yield，saga会等待异步请求的结果，结果返回后内部制动执行next()）
//     yield call(my.get,'database/cart/:id');
    
//     yield put({type:'REMOVE_FROM_CART'})
// }


function * rootSaga(){
    // 监听用户命令
    yield takeLatest('CHANGE_GOODS_QTY_ASYNC',getInventory);
}

export default rootSaga;