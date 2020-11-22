import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import { Multiselect } from 'multiselect-react-dropdown';
import callApi from "../../utils/api";
import {toast} from "../../utils/alert";

class UserForm extends Component{
    constructor(props) {
        super(props);
        this.multiselectRef = React.createRef();
        this.state = {
            roles: [],
            selectedRoles: [],
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: ':attribute không được rỗng'
            },
            className: 'text-danger'
        });
    }

    getRoles = () => {
        callApi('roles/select')
            .then(res => this.setState({roles: res.data}))
            .catch(error => console.log(error));
    }

    componentDidMount() {
        if (this.props.item) {this.setState({selectedRoles: this.props.item})};
        this.getRoles();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({selectedRoles: nextProps.item});
    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const id = this.props.id;
            let data;
            if(id) {
                let newItems = this.state.selectedRoles;
                let oldItems = this.props.item;
                newItems = newItems.map(p => p.id);
                oldItems = oldItems.map(p => p.id);
                const removeItems = oldItems.filter(p => !newItems.includes(p));
                const addItems = newItems.filter(p => !oldItems.includes(p));
                data = {removeItems,addItems};
                callApi(`users/${id}`, 'PUT', data)
                    .then(res => {
                        toast('success', 'Phân quyền thành công')
                        this.props.eventEdit(id, res.data.roles);
                        this.setState({selectedRoles:res.data.roles});
                    })
                    .catch(error => {
                        console.log(error)
                        toast('error', 'Phân quyền thất bại')
                    });
            }
        } else {
            this.forceUpdate();
            this.validator.showMessages();
        }
    }


    handleMultiSelect = (selectedList) =>
        this.setState({selectedRoles: [...this.multiselectRef.current.getSelectedItems()]})


    onSelect = (selectedList) => this.handleMultiSelect(selectedList);

    onRemove = (selectedList) => this.handleMultiSelect(selectedList);

    render() {
        const { selectedRoles, roles } = this.state;
        return (
            <form onSubmit={this.submitForm}>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="permissions">Trạng thái</label>
                        <Multiselect
                            closeIcon='cancel'
                            options={roles}
                            selectedValues={selectedRoles}
                            onSelect={this.onSelect}
                            ref={this.multiselectRef}
                            onRemove={this.onRemove}
                            displayValue="displayName"
                            placeholder="Chọn quyền"
                        />
                        {this.validator.message('Quyền', selectedRoles, 'required')}
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}
export default UserForm;