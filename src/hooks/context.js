import React from 'react';

export class State {
    success = 0;

    setSuccess(val) {
        this.success = val;
    }

    init() {
        return this.success;
    }
}

const StateContext = React.createContext(null);

export default StateContext;
