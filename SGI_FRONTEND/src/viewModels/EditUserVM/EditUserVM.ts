import { useState } from "react";

export const editUserVM=()=>{
    const [state, setState] = useState(true);
    const changeState = () => {
      setState(!state);
    };
    
return{
state,changeState
}
}