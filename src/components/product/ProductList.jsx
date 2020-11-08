import React from "react";
import {IMAGE_URL} from "../../constants/config";
import {NavLink} from "react-router-dom";

const ProductList = (props) => {
    const renderPriority = (param) => {
        let className = '';
        let text = '';
        switch (param) {
            case 1:
                className = 'badge-light';
                text = 'Mới';
                break;
            case 2:
                className = 'badge-info';
                text = 'Bán chạy';
                break;
            case 3:
                className = 'badge-warning';
                text = 'Nổi bật';
                break;
            default:
                className = '';
                text = '';
        }
        return (<span className={`badge ${className}`}>{text}</span>);
    }
    const renderCategories = (param) => {
        return param.map((c,i) => (
            <li key={i}>{c.name}</li>
        ))
    }
    const renderVision = (param) => {
        let className = '';
        let text = '';
        switch (param) {
            case 1:
                className = 'badge-primary';
                text = 'Được mua';
                break;
            case 2:
                className = 'badge-dark';
                text = 'Chỉ được xem';
                break;
            default:
                text = '';
                className = '';
        }
        return (<span className={`badge ${className}`}>{text}</span>)
    }
    const renderStatus = (param) => {
        let className = '';
        let text = '';
        switch (param) {
            case true:
                className = 'badge-success';
                text = 'Active';
                break;
            case false:
                className = 'badge-danger';
                text = 'Disable';
                break;
            default:
                className = '';
                text = '';
        }
        return (<span className={`badge ${className}`}>{text}</span>)
    }
    return (
        <div className={`card-body table-responsive p-0 col-md-12`}>
            <table className="table table-hover text-nowrap">
                <thead>
                <tr>
                    <th><a href=' #' className="btn btn-outline-danger"><i className="fa fa-trash-alt"></i></a></th>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Nhãn hiệu</th>
                    <th>Danh mục</th>
                    <th>Độ ưu tiên</th>
                    <th>Chế độ</th>
                    <th>Trạng thái</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {(props.items || props.items.length) &&
                    (props.items.map((item,index) => (
                        <tr key={item.id}>
                            <td><div className="icheck-primary">
                                <input
                                    id={`check${index}`}
                                    name="check" type="checkbox"
                                    className="form-check-input"/>
                                    <label htmlFor={`check${index}`}></label>
                            </div></td>
                            <td>
                                <img alt='' src={(item.image)
                                    ? IMAGE_URL+item.image
                                    : 'https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'}
                                     width={'100px'}/>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.brand.name}</td>
                            <td><ul>
                                    {
                                        (item.categories || item.categories.length) &&
                                        (renderCategories(item.categories))
                                    }
                                </ul></td>
                            <td>{renderPriority(item.priority)}</td>
                            <td>{renderVision(item.vision)}</td>
                            <td>{renderStatus(item.status)}</td>
                            <td>
                                <NavLink to={`/products/edit/${item.id}`} style={{ marginRight: '5px' }} type="button" className="btn btn-outline-warning">
                                    <i className="fa fa-pen"></i>
                                </NavLink>
                                <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}
export default ProductList;