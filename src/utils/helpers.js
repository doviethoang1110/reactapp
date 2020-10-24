import Sku from "../models/Sku";

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