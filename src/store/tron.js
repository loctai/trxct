// import API from '@/api'
import util from '@/util/util'
import * as factory from '@/util/contract/factory'
import Axios from "axios";
const tron = {
    state: {
        tronData: {
            isInjected: false,
            tronWebInstance: null,
            coinbase: null,
            balance: null || 0,
            contract: null
        }
    },
    mutations: {
        registerTronWebInstance (state, payload) {
           
            let result = payload
            let copy = state.tronData
            copy.coinbase = result.coinbase
            copy.balance = parseFloat(result.tronWeb.fromSun(result.balance))
            copy.isInjected = result.injectedTronWeb
            copy.tronWebInstance = result.tronWeb
            copy.contract = result.contract
            state.tronData = copy
        },
        updateState(state, data) {
            state = {...state, data}
        },
        pollTronWebInstance (state, payload) {
          
            state.tronData.coinbase = payload.coinbase
            state.tronData.balance = parseInt(payload.balance, 10)
        },
    },
    actions: {
        async registerTronWeb ({commit}) {
            let tronWeb = window.tronWeb;
            let result = {
                injectedTronWeb: tronWeb.ready,
                coinbase: tronWeb.defaultAddress.base58,
                balance: null,
                tronWeb
            };
            // await API.login({
            //     address: result.coinbase
            // }).then(res => {
            //     if (res.code === 0) {
            //         util.setCookie('access_token', res.data.access_token);
            //     }
            // });
            Axios.post("/api/createTron", {
                address: result.coinbase
            }).then(res => {            
                if (res.data.auth === true) {
                    util.setCookie('access_token', res.data.token);
                }
            }).catch(function(error) {
                console.error(error.response);
            });
            result.balance = await tronWeb.trx.getBalance(result.coinbase);
            result.contract = tronWeb.contract(factory.ABI, tronWeb.address.toHex(factory.address));
            commit('registerTronWebInstance', result);
        },
        pollTronWeb ({commit}, payload) {
            commit('pollTronWebInstance', payload)
        },
    },
    getters: {}
}
export default tron