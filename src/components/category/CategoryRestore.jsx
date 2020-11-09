import React from 'react';

const CategoryRestore = (props) => {
    const restore = (e,id) => {
        e.preventDefault();
        if(window.confirm('Bạn có chắc không')) props.eventRestore(id);
        else return;
    }
    let list = props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
                <button onClick={(e) => restore(e,item.id)} type="button" className="mr-2 btn btn-outline-primary"><i className="fa fa-trash-restore"></i></button>
            </td>
        </tr>
    ));
    return (
        <React.Fragment>
            {(!props.items || ! props.items.length) ? (<h2>Thùng rác trống</h2>) : (
                <table className="table table-hover text-nowrap">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
            )}

        </React.Fragment>
    );
}
export default CategoryRestore;