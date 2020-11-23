import React, {useEffect, useState} from 'react';
import BlogList from "../components/blog/BlogList";
import BlogForm from "../components/blog/BlogForm";
import callApi from "../utils/api";
import store from "../store";
import {actionToggleLoading} from "../actions/loading";
import Pagination from "../components/Pagination";
import {toast} from "../utils/alert";
import Blog from "../models/Blog";
import BlogRestore from "../components/blog/BlogRestore";
import {getDatas, toastRoles} from "../utils/helpers";
import { connect } from "react-redux";
import {actionToggleGrant} from "../actions/grant";

const permission = 'TEST';

const Blogs = (props) => {
    // state hook
    const [blogs,setBlogs] = useState([]);
    const [blog, setBlog] = useState(new Blog('','<p>Đây là nội dung</p>',false,null));
    const [blogRestore, setBlogRestore] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [isRestore, setIsRestore] = useState(false);
    const itemsPerPage = 4;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = blogs.slice(firstItem,lastItem);

    // method
    const add = () => {
        setBlog(new Blog('','<p>Đây là nội dung</p>',false,null));
        setIsForm(true);
    }

    const refresh = () => getDatas('blogs', setBlogs)

    const getRestore = () => {
        callApi('blogs/restore')
            .then(res => {
                setIsRestore(true);
                setBlogRestore(res.data);
            })
            .catch(error => {
                toast('error', error);
                toastRoles(error)
            })
    }

    const restore = (id) => {
        callApi(`blogs/restore/${id}`, 'PATCH')
            .then(response => {
                blogRestore.splice(blogRestore.indexOf(blogRestore.find(b => b.id === id)),1);
                blogs.push(response.data);
                setBlogs(blogs);
                setBlogRestore([...blogRestore]);
                toast('success','Restore successfully');
            })
            .catch(error => {
                console.log(error)
                toastRoles(error)
                toast('error',error)
            });
    }

    const hardRemove = (id) => {
        callApi(`blogs/${id}`,'DELETE')
            .then(() => {
                blogRestore.splice(blogRestore.indexOf(blogRestore.find(b => b.id === id)),1);
                setBlogRestore([...blogRestore])
                toast('success','Delete successfully');
            })
            .catch(error => {
                toastRoles(error)
                toast('error',error);
            })
    }

    const back = () => {
        if(blog.id) {
            let {title,content,status,image} = blog;
            setBlog({title,content,status,image})
        }
        if(isForm) setIsForm(false);
        if(isRestore) setIsRestore(false);
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    const create = (data) => {
        blogs.push(data);
        setBlogs(blogs);
    }

    const edit = (id) => {
        store.dispatch(actionToggleLoading(true))
        setIsForm(true);
        callApi(`blogs/${id}`)
            .then(res => {
                store.dispatch(actionToggleLoading(false))
                setBlog(res.data);
            })
            .catch(error => {
                store.dispatch(actionToggleLoading(false))
                toast('error',error);
            })
    }

    const update = (id,data) => {
        blogs[blogs.indexOf(blogs.find(b => b.id === id))] = data;
        setBlogs(blogs);
    }

    const remove = (id) => {
        if(window.confirm('Bạn có chắc không')) {
            callApi(`blogs/${id}`,'PATCH')
                .then(() => {
                    blogs.splice(blogs.indexOf(blogs.find(b => b.id === id)),1)
                    setBlogs([...blogs]);
                    toast('success','Delete successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast('error','Delete failure');
                    toastRoles(error)
                })
        }
    }

    const fetchDatas = () => {
        if(props.roles.some(r => permission === r)) {
            props.toggle(true)
            getDatas('blogs', setBlogs);
        }else props.toggle(false)
    }

    useEffect((props) => {
        fetchDatas();
    },[]);

    return (
        <React.Fragment>
            {!props.grant ? (
                <div className='jumbotron'><h2>Bạn không có quyền</h2></div>
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-header">
                            {!blog.id && (
                                <button onClick={add} className="btn btn-success card-title">
                                    <i className="fa fa-plus"></i> Add new
                                </button>
                            )}
                            <button onClick={refresh} className="ml-2 btn btn-outline-primary card-title">
                                <i className="fas fa-sync"></i> Refresh
                            </button>
                            <button onClick={getRestore} className="ml-2 btn btn-outline-warning card-title">
                                <i className="fa fa-trash-restore"></i> Restore
                            </button>
                            {(isRestore || isForm) && (
                                <button onClick={back} className="ml-2 btn btn-outline-dark card-title">
                                    <i className="fa fa-backward"></i> Back
                                </button>
                            )}
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
                        {
                            (isForm &&
                                (
                                    <BlogForm eventAdd={create} item={blog} eventEdit={update}/>
                                )
                            )
                            ||
                            (isRestore &&
                                (
                                    <BlogRestore items={blogRestore} eventRestore={restore} eventHardRemove={hardRemove}/>
                                )
                            )
                            ||
                            (
                                <React.Fragment>
                                    <BlogList items={currentItems} eventEdit={edit} eventRemove={remove}/>
                                    <Pagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={blogs}
                                        currentPage={currentPage}
                                        changePage={paginate}
                                    />
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

// redux map
const mapStateToProps = (state) => {
    return {
        roles: state.auth.user.roles,
        grant: state.grant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle:(grant) => {
            dispatch(actionToggleGrant(grant))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
