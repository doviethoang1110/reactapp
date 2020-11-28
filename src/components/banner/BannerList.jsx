import React from 'react';
import {IMAGE_URL} from "../../constants/config";

const BannerList = (props) => {

    const edit = (e,id) => {
        e.preventDefault();
        props.eventEdit(id);
    }
    const remove = (e,id) => {
        e.preventDefault();
        props.eventRemove(id);
    }

    const type = (type) => {
        switch (+type) {
            case 1:
                return 'Banner chính';
            case 2:
                return 'Banner quảng cáo';
            case 3:
                return 'Banner SEO';
            default:
                return '';
        }
    }

    const list = !props.items.length ? null : props.items.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{type(item.type)}</td>
            <td><img alt='' src={IMAGE_URL+item.image} width={'100px'}/></td>
            <td><span className={item.status ? 'badge badge-success' : 'badge badge-danger'}>{item.status ? 'Active' : 'Disable'}</span></td>
            <td>
                <button onClick={(e) => edit(e,item.id)} type="button" className="mr-2 btn btn-outline-warning"><i className="fa fa-pen"></i></button>
                <button onClick={(e) => remove(e,item.id)} type="button" className="btn btn-outline-danger"><i className="fa fa-trash"></i></button>
            </td>
        </tr>
    ));
    return (
        <React.Fragment>
            {!props.items || !props.items.length ? <h2>Chưa có banner nào</h2> : (
                <table className="table table-hover text-nowrap">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Image</th>
                        <th>Status</th>
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
export default BannerList;