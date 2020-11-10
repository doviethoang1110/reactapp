import React, {useEffect, useState} from 'react';
import BlogList from "../components/blog/BlogList";
import BlogForm from "../components/blog/BlogForm";
import callApi from "../utils/api";
import store from "../store";
import {actionToggleLoading} from "../actions/loading";
import Pagination from "../components/Pagination";

const Blogs = (props) => {
    const [blogs,setBlogs] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = blogs.slice(firstItem,lastItem);
    const openForm = () => {
        setIsForm(true);
    }
    const changeTab = () => {
        setIsForm(false);
    }
    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }
    const add = (data) => {
        blogs.push(data);
        setBlogs(blogs);
    }
    useEffect((props) => {
        getBlogs();
    },[])
    const getBlogs = () => {
        store.dispatch(actionToggleLoading(true))
        setTimeout(() => {
            callApi('blogs')
                .then(res => {
                    store.dispatch(actionToggleLoading(false))
                    setBlogs(res.data)
                })
                .catch(error => {
                    store.dispatch(actionToggleLoading(false))
                    console.log(error)
                });
        },1500)
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card-header">
                    <button onClick={openForm} className="btn btn-success card-title">
                        <i className="fa fa-plus"></i> Add new
                    </button>
                    <button className="ml-2 btn btn-outline-primary card-title">
                        <i className="fas fa-sync"></i> Refresh
                    </button>
                    <button className="ml-2 btn btn-outline-warning card-title">
                        <i className="fa fa-trash-restore"></i> Restore
                    </button>
                    <button onClick={changeTab} className="ml-2 btn btn-outline-dark card-title">
                        <i className="fa fa-backward"></i> Back
                    </button>
                    <div className="card-tools">
                        <div className="input-group input-group-sm" style={{ width: "150px" }}>
                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-default">
                                    <i className="fas fa-search" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.card */}
            </div>
            <div className={`card-body ${isForm ? 'table-responsive p-0' : ''} col-md-12`}>
                {isForm ? (<BlogForm eventAdd={add}/>) : (
                    <React.Fragment>
                        <BlogList items={currentItems}/>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={blogs}
                            currentPage={currentPage}
                            changePage={paginate}
                        />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
export default Blogs;
