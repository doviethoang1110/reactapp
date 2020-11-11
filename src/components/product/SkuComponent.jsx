import React from "react";
import InputNumber from "../InputNumber";
import callApi from "../../utils/api";
import {toast} from "../../utils/alert";

class SkuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skus :[],
            request: [],
        }
    }
    handleChange = (e,index) => {
        e.preventDefault();
        let skus = [...this.state.skus];
        skus[index][e.target.name] = e.target.value;
        this.setState({skus});
    }
    checkedRequest = (e,index) => {
        let request = [...this.state.request];
        let skus = [...this.state.skus];
        e.target.checked ? request.push(skus[index]) : request.splice(skus[index],1);
        this.setState({request})
    }
    submitSave = (e) => {
        e.preventDefault();
        let data = [...this.state.request];
        if(data.length === 0) {
            alert('chọn ít nhất 1 bản ghi');
            return;
        }
        else {
            data = data.map(d => ({
                exportPrice:d.exportPrice,
                importPrice:d.importPrice,
                id:d.id,
                stock: +d.status ? +d.quantity : (+d.stock + +d.quantity),
            }))
            callApi(`products/edit/${this.props.id}/skus`,'PUT',data)
                .then(res => {
                    setTimeout(() => {
                        window.location.reload();
                    },0);
                })
                .catch(error => {
                    toast('error',error.response.data)
                })
        }
    }
    handleClick = (e,index) => {
        e.preventDefault();
        let skus = [...this.state.skus];
        skus[index].status = e.target.value;
        this.setState({skus})
    }
    handleInputNumber = (index,value) => {
        let skus = [...this.state.skus];
        skus[index].quantity = value;
        this.setState({skus})
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({skus:nextProps.items});
    }

    render() {
        let { skus } = this.state;
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col-md-12'>
                        <table className='table table-bordered'>
                            <thead>
                            <tr>
                                <th>Chọn</th>
                                <th>Mã kho</th>
                                <th>Giá nhập</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th>Action <button onClick={(e) => this.submitSave(e)} className='ml-2 btn btn-outline-info'>Save</button> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(skus) && (
                                skus.map((s,index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="icheck-primary">
                                                <input type="checkbox" id={`check${index}`} onClick={(e) => this.checkedRequest(e,index)}/>
                                                <label htmlFor={`check${index}`}></label>
                                            </div>
                                        </td>
                                        <td>
                                            <h3 style={{color:'coral'}}>{s.code}</h3>
                                            <h5>{s.values && s.values.map((m,i) => {
                                                return (
                                                    <span className={(i===0 && 'text-success')||(i===1&& 'text-primary')||(i===2&& 'text-danger')}
                                                          key={i}>{m}{s.values.length-1 > i ? ',' : ''}
                                                </span>
                                                );
                                            })}</h5>
                                        </td>
                                        <td>
                                            <div className="form-group">
                                                <input
                                                    name='importPrice'
                                                    value={s.importPrice}
                                                    onChange={(e) => this.handleChange(e,index)}
                                                    type="number" className="form-control" placeholder="Giá nhập"/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-group">
                                                <input
                                                    name='exportPrice'
                                                    value={s.exportPrice}
                                                    onChange={(e) => this.handleChange(e,index)}
                                                    type="number" className="form-control" placeholder="Giá bán"/>
                                            </div>
                                        </td>
                                        <td>
                                            <h4 style={{color: '#1e2b37'}}>{s.stock} {s.status !== null && (
                                                <i className="fa fa-arrow-right">
                                                <span style={{color: 'orange'}}>
                                                    {s.status === '1' && s.quantity > 0 ? s.quantity : s.stock + s.quantity}
                                                </span></i>

                                            )}</h4>

                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                                <label className={`btn btn-outline-primary ${s.status === 1 ? 'active' : ''}`}>
                                                    <input onClick={(e) => this.handleClick(e,index)} type="radio" name="status" value={1}/> Set
                                                </label>
                                                <label className={`btn btn-outline-primary ${s.status === 0 ? 'active' : ''}`}>
                                                    <input onClick={(e) => this.handleClick(e,index)} type="radio" name="status" value={0}/> Add
                                                </label>
                                                <InputNumber event={this.handleInputNumber} index={index}/>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default SkuComponent;