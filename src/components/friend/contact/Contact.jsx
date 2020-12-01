import React, {useEffect, useState} from "react";
import Pagination from "../../Pagination";
import ContactList from "./ContactList";
import {calCurrentItems, getDatas} from "../../../utils/helpers";

const Contact = (props) => {

    const [currentPage,setCurrentPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const [input, setInput] = useState("");
    const [filterContacts, setFilterContacts] = useState([]);

    useEffect(() => {
        getDatas('users/userDetails', setContacts);
    },[]);

    const change = (e) => {
        const input = e.target.value.toLowerCase().trim();
        if(input.length) {
            const datas = contacts.filter(c => {
                if(c.userDetail.displayName) {
                    if(c.userDetail.displayName.toLowerCase().trim().indexOf(input) > -1) return c;
                }
                else {
                    if(c.name.toLowerCase().trim().indexOf(input) > -1) return c;
                }
            });
            setFilterContacts(datas);
        }else setFilterContacts([]);
        setInput(input);
    }

    const paginate = (e,page) => {
        e.preventDefault();
        setCurrentPage(page);
    }

    return (
        <React.Fragment>
            <input onInput={change} style={{width: '500px'}} className="mt-2 mb-2 form-control form-control-navbar"
                   type="search" placeholder="Search"/>
            <div className="card card-solid">
                <div className="card-body pb-0">
                    <div className="row d-flex align-items-stretch">
                        <ContactList items={calCurrentItems(currentPage, filterContacts.length ? filterContacts : (input ? [] : contacts))}/>
                    </div>
                </div>
                <div className="card-footer">
                    <Pagination
                        itemsPerPage={6}
                        totalItems={filterContacts.length ? filterContacts : (input ? [] : contacts)}
                        currentPage={currentPage}
                        changePage={paginate}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Contact;