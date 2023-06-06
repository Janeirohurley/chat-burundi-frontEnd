import React from 'react';
import "./loding.css"
const Loading = ({data})=>{
    return(
<div className="body">
<div className="loading">
<span></span>
<span></span>
<span></span>
<span></span>
<h2>{data ? data:"Loading...."}</h2>
</div>
        </div>
        )

}
export default Loading;