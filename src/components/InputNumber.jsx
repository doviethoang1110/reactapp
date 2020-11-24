import React, {useEffect, useState} from "react";
import './InputNumber.css'
const InputNumber = (props) => {
    const [number, setNumber] = useState(1);
    useEffect(() => {
        props.event(props.index,number);
    },[number,props]);

    const minus = (e) => {
        e.preventDefault();
        setNumber((number -1 < 1) ? number : (number - 1))
    }
    const handleChange = (e) => {
        e.preventDefault();
        setNumber((e.target.value < 1 || e.target.value > 100) ? number : e.target.value);
    }
    const plus = (e) => {
        e.preventDefault();
        setNumber((number + 1 > 100) ? number : (number + 1));
    }

    return (
        <div className="number-input">
            <button
                onClick={(e) => minus(e)}>
                <i className='fa fa-minus'></i>
            </button>
                <input onChange={(e) => handleChange(e)} className="quantity" name="quantity" value={number} type="number"/>
            <button
                onClick={(e) => plus(e)}>
                <i className='fa fa-plus'></i>
            </button>
        </div>
    )
}
export default InputNumber;