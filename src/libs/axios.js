import Vue from 'vue';
import axios from 'axios';
import qs from 'qs'

// let env = process.env.NODE_ENV;
// axios.defaults.baseURL= (env === "development" ? '' : 'https://api.ithome.com/');


function ajax(options) {
    const CancelToken = axios.CancelToken
    axios({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: options.methods,
        url: options.uri,
        data: qs.stringify(options.data),
        cancelToken: new CancelToken(function executor(c) {
            Vue.$httpRequestList.push(c)
        })
    }).then(res => {
        options.successCallback && options.successCallback(res.data);
    })
}


function clearHttpRequestingList() {
    if (Vue.$httpRequestList.length > 0) {
        Vue.$httpRequestList.forEach((item) => {
            item()
        })
        Vue.$httpRequestList = []
    }
}


Vue.prototype.$axios = ajax;

export {
    ajax,
    clearHttpRequestingList
}