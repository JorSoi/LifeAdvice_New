'use client'

import React from "react";

interface Button extends React.HTMLAttributes<HTMLButtonElement> {
    test? : string;
    isHappy? : boolean;
} 

function Button({isHappy, ...props} : Button) {
    console.log({...props})
    return (
        <button {...props}>
           {{isHappy} ? 'Im happy' : 'Im not happy'}
        </button>
    );
}

export default Button;