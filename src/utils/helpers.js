export const getCategories = (datas,id = 0) => {
    let categories = datas.filter(category => category.parentId === id);
    let temp = datas.filter(e => !categories.includes(e))
    let output = [];
    for (let category of categories) {
        let cat = {};
        cat.id = category._id;
        cat.name = category.name;
        cat.status = category.status;
        cat.parentId = category.parentId;
        cat.children = getCategories(temp,cat.id);
        output.push(cat);
    }
    return output;
}