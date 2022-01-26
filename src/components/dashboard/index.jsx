import React, { useContext, useState } from 'react';
import StateContext from '../../hooks/context';
import './index.css';

export default function Dashboard() {
    // useContext(本身)才能接受参数
    const state = useContext(StateContext);
    const [success, setSuccess] = useState(() => state.init());

    const Reset = () => {
        setSuccess(0);
        state.setSuccess(0);
        alert('Reset dashboard!!!');
    }
    return (
        <div className="home-container">
            <div>Please choose an option from navbar</div>
            <div className="result-container">
                Game won: { success }
                <button onClick={Reset}>Reset</button>
            </div>
        </div>
    )
}
