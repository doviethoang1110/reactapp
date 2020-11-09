import React from 'react';


const CategoryList = (props) => {
    const edit = (id, e) => {
        e.stopPropagation();
        props.event(id);
    }
    const remove = (id, e) => {
        e.stopPropagation();
        props.eventRemove(id);
    }
    const toggle = (id, e) => {
        e.stopPropagation();
        let ele = document.getElementById(id);
        let style = e.target;
        if (ele) {
            if (ele.style.display === 'none') {
                style.className = 'fa fa-chevron-down'
                ele.style.display = 'block';
            } else {
                style.className = 'fa fa-chevron-right'
                ele.style.display = 'none';
            }
        } else {
            return false;
        }
    }

    if (!props.items || !props.items.length) {
        return null;
    } else {
        return props.items.map((item, index) => (
            <li key={index}>
                <i style={{ cursor: 'pointer' }}
                               onClick={(e) => toggle(item.id, e)}
                               className={item.children.length === 0 ? 'fa fa-minus' : 'fa fa-chevron-right'}>
                </i> {item.name}
                <div className={item.children.length === 0 ? 'button button1' : 'button'}>
                    <div><button onClick={(e) => edit(item.id, e)} style={{ marginRight: '5px' }} type="button" className="btn btn-warning"><i className="fa fa-pen"></i></button></div>
                    <div><button onClick={(e) => remove(item.id, e)} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button></div>
                </div>
                {item.children.length > 0 ? (<ul id={item.id} style={{ display: 'none', marginLeft: '50px' }}>
                    <CategoryList items={item.children} event={props.event}></CategoryList>
                </ul>) : ''}
            </li>
        ));
    }
}
export default CategoryList;