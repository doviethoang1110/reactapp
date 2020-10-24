import React,{Component} from "react";
import './InputTag.css';
class InputTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.items.length !== prevState.tags.length){
            return { tags: nextProps.items};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.items.length !== this.props.items.length){
            this.setState({tags: this.props.items});
        }
    }

    render() {
        const { tags } = this.state;
        return (
            <div className="input-tag">
                <ul className="input-tag__tags">
                    { tags.map((tag, i) => (
                        <li key={tag}>
                            {tag}
                            <button type="button"
                                    onClick={() => { this.props.removeTag(this.props.index,i); }}>+</button>
                        </li>
                    ))}
                    <li className="input-tag__tags__input">
                        <input type="text"
                               onKeyDown={(e) => this.props.addTag(e,this.props.index)}/>
                    </li>
                </ul>
            </div>
        );
    }
}
export default InputTag;