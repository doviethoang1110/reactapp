import React from "react";

const UserDetails = (props) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-3">
                    <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                <img className="profile-user-img img-fluid img-circle"
                                     src="../../dist/img/user4-128x128.jpg" alt="User profile picture"/>
                            </div>
                            <h3 className="profile-username text-center">Nina Mcintire</h3>

                            <p className="text-muted text-center">Software Engineer</p>

                            <ul className="list-group list-group-unbordered mb-3">
                                <li className="list-group-item">
                                    <b>Friends</b> <a className="float-right">13,287</a>
                                </li>
                            </ul>

                            <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
                        </div>
                    </div>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">About Me</h3>
                        </div>
                        <div className="card-body">
                            <strong><i className="fas fa-book mr-1"></i> Education</strong>
                            <p className="text-muted">B.S. in Computer Science from the University of Tennessee at Knoxville</p>
                                <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>
                                <p className="text-muted">Malibu, California</p>
                                    <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>
                                    <p className="text-muted">
                                        <span className="tag tag-danger">UI Design</span>
                                        <span className="tag tag-success">Coding</span>
                                        <span className="tag tag-info">Javascript</span>
                                        <span className="tag tag-warning">PHP</span>
                                        <span className="tag tag-primary">Node.js</span>
                                    </p>
                                        <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>

                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit. Etiam fermentum enim neque.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header p-2">
                            <ul className="nav nav-pills">
                                <li className="nav-item"><a className="nav-link active" href="#settings"
                                                            data-toggle="tab">Chỉnh sửa</a></li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane active" id="settings">
                                    <form className="form-horizontal">
                                        <div className="form-group row">
                                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="email" className="form-control" id="inputName"
                                                       placeholder="Name"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputEmail"
                                                   className="col-sm-2 col-form-label">Email</label>
                                            <div className="col-sm-10">
                                                <input type="email" className="form-control" id="inputEmail"
                                                       placeholder="Email"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="inputName2"
                                                       placeholder="Name"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputExperience"
                                                   className="col-sm-2 col-form-label">Experience</label>
                                            <div className="col-sm-10">
                                                <textarea className="form-control" id="inputExperience"
                                                          placeholder="Experience"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputSkills"
                                                   className="col-sm-2 col-form-label">Skills</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="inputSkills"
                                                       placeholder="Skills"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="offset-sm-2 col-sm-10">
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox"/> I agree to the <a href="#">terms and
                                                            conditions</a>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="offset-sm-2 col-sm-10">
                                                <button type="submit" className="btn btn-danger">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserDetails;