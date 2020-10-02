import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TreeSelect } from "antd";
import { actionAddCategory } from "../actions/category";
import { connect } from "react-redux";

const CategoryForm = (props) => {

    const [value = 1] = useState();

    const onSubmit = data => {
        console.log(data);
        props.addCategory(data);
    };
    const { register, handleSubmit, errors, control } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="name">Tên danh mục</label>
                    <input
                        type="text" name="name"
                        className="form-control"
                        id="name"
                        ref={register(
                            {
                                required: { value: true, message: 'Tên không được rỗng' },
                                minLength: { value: 5, message: 'Tên nhiều hơn 5 ký tự' },
                                maxLength: { value: 20, message: 'Tên không quá 20 ký tự' }
                            },
                        )}
                        placeholder="Nhập tên danh mục" />
                    <span className="text-danger">{errors?.name?.message}</span>
                    <span className="text-danger" id="err_name"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="parentId">Danh mục cha</label>
                    <Controller
                        style={{ width: "100%" }}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        treeData={props.treeData}
                        placeholder="Chọn danh mục cha"
                        as={TreeSelect}
                        name="parentId"
                        control={control}
                        rules={{ required: true, message: 'Danh mục không được rỗng' }}
                        defaultValue={value}
                    />
                    <span className="text-danger">{errors?.parent_id?.message}</span>
                    <span className="text-danger" id="err_parentId"></span>
                </div>
                <div className="form-check">
                    <input
                        ref={register()} 
                        name="status" type="checkbox"
                        className="form-check-input" id="status" />
                    <label className="form-check-label" htmlFor="status">Hiển thị</label>
                    <span className="text-danger" id="err_status"></span>
                </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (category) => {
            dispatch(actionAddCategory(category))
                .then(response => { console.log(response) })
                .catch(error => {
                    for(let e in error) {
                        document.getElementById('err_'+e).innerText = error[e];
                    }
                });
        }
    }
}

export default connect(null, mapDispatchToProps)(CategoryForm);