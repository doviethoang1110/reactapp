import Sku from "../models/Sku";
import store from "../store";
import {actionToggleLoading} from "../actions/loading";
import callApi from "./api";
import {toast} from "./alert";

export const getCategories = (datas,id = 0) => {
    let categories = datas.filter(category => category.parentId === id);
    let temp = datas.filter(e => !categories.includes(e))
    let output = [];
    for (let category of categories) {
        let cat = {};
        cat.id = category.id;
        cat.name = category.name;
        cat.status = category.status;
        cat.parentId = category.parentId;
        cat.children = getCategories(temp,cat.id);
        output.push(cat);
    }
    return output;
}


export const resetState = (options,index,val ='') => {
    let skus = [];
    if(val) options[index].values = [...options[index].values,val];
    if(options.length === 1) {
        options[0].values.forEach(a=>{
            skus.push(new Sku("",10,100000,200000,[a]));
        });
    }else if(options.length === 2) {
        options[0].values.forEach(a=>{
            options[1].values.forEach(b=>{
                skus.push(new Sku("",10,100000,200000,[a,b]));
            });
        });
    }else if(options.length === 3) {
        options[0].values.forEach(a=>{
            options[1].values.forEach(b=>{
                options[2].values.forEach(c=>{
                    skus.push(new Sku("",10,100000,200000,[a,b,c]));
                });
            });
        });
    }
    return {options,skus}
}

export const getDatas = (url,callback) => {
    store.dispatch(actionToggleLoading(true))
    setTimeout(() => {
        callApi(url)
            .then(res => {
                store.dispatch(actionToggleLoading(false))
                callback(res.data);
            })
            .catch(error => {
                store.dispatch(actionToggleLoading(false))
                console.log(error)
            });
    },1500)
}

export const save = ({url, id, data, eventEdit, eventAdd}, method) => {
    store.dispatch(actionToggleLoading(true));
    return callApi(`${url + (id ? '/'+ id : '')}`,method,data)
        .then(response => {
            const res = response.data;
            store.dispatch(actionToggleLoading(false))
            for(let a of document.getElementsByClassName('errorMsg')) a.innerText = '';
            id ? eventEdit(id,res) : eventAdd(res);
            toast('success', `${id ? 'Updated': 'Added'} successfully`);
            return res;
        })
        .catch(error => {
            store.dispatch(actionToggleLoading(false))
            for(let e in error.response.data) document.getElementById('err_'+e).innerText = error.response.data[e];
            toast('error',`${id ? 'Updated': 'Added'} failure`)
        })
}

export const modify = (url) => {
    store.dispatch(actionToggleLoading(true))
    return callApi(url)
        .then(res => {
            store.dispatch(actionToggleLoading(false));
            return res.data;
        })
        .catch(error => {
            store.dispatch(actionToggleLoading(false))
            toast('error',error.response.data);
        })
}

export const hardRemove = (url) => {
    if(window.confirm('Bạn có chắc không'))
        return callApi(url,'DELETE')
            .then(() => toast('success','Delete successfully'))
            .catch(error => toast('error','Delete failure'))

}