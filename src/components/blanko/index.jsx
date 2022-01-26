import React, { useState, useEffect, useMemo, useContext, Fragment } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { strs } from '../../data/blanko';
import StateContext from '../../hooks/context';
import './index.css';


// 第一步: 随机获取一个单词
const getOneWord = () => {
    return strs[Math.floor(Math.random() * strs.length)];
}

// // 第二步: 获取单词中三个空格的位置
const getBlankPosition = (str) => {
    // 获取单词中空格的位置
    const fakeBlank = [];
    str.split('').forEach((char, index) => {
        char === ' ' && fakeBlank.push(index);
    });

    // 获取空格的位置
    const realBlank= [];
    const getRandomPosition = () => {
        const pos = Math.floor(Math.random() * 12);
        if (realBlank.includes(pos) || fakeBlank.includes()) {
            return getRandomPosition();
        }
        return pos;
    }
    for (let i = 0; i < 3; i++) {
        const position = getRandomPosition();
        realBlank.push(position); 
    }
    return realBlank;
}


export default function Blanko() {
    const [targetStr, setTargetStr] = useState(getOneWord());
    const [resultStr, setResultStr] = useState();
    const positions = useMemo(() => getBlankPosition(targetStr), [targetStr]);
    const state = useContext(StateContext);
    
    useEffect(() => {
        const tempStr = [...targetStr];
        for (const ind of positions) {
            tempStr[ind] = ' ';
        }
        const resStr = tempStr.join('');
        setResultStr(resStr);
    }, [targetStr, positions])
    
    
    const wordChange = (e, index) => {
        const val = e.target.value || ' ';
        const tempStr = [...resultStr];
        tempStr[index] = val;
        const resStr = tempStr.join('');
        // 判断resultStr
        if (resStr === targetStr) {
            state.setSuccess(state.success + 1);
            alert('Blanko successfully!!!');
        }
        // 设置
        setResultStr(resStr);
    }
    
    const blankoReset = () => {
        const resetWord = getOneWord();
        setTargetStr(resetWord);
        setResultStr(undefined);
    }
    console.log(targetStr, resultStr);
    return (
        <Fragment>
        <div className="blanko-container">
        {targetStr.split('').map((letter, index) => {
            if (positions.includes(index)) {
                return (
                    <Input
                        sx={{
                            borderRight: '1px solid black',
                            width: '28px',
                            height: '28px',
                            paddingLeft: '8px',
                            paddingRight: '8px',
                        }}
                        inputProps={{
                            maxLength: 1, 
                        }}
                        key={index.toString()}
                        onChange={(e) => wordChange(e, index)}
                    />
                );
            } else {
                return(
                    <div key={index.toString()} 
                        style={{
                            borderRight: '1px solid black',
                            width: '28px',
                            height: '28px',
                            textAlign: 'center',
                            lineHeight: '28px',
                        }}
                    >
                        {letter}
                    </div>
                );
            }
        })}
        </div>
        <Button 
            variant="outlined"
            onClick={blankoReset}
            sx={{
                display: 'block',
                marginTop: '21px',
            }}
        >
        Reset
        </Button>
        </Fragment>
    )
}
