import { height } from "@mui/system";
import React from "react";

const Edit = () => (
    <div style={{display:"flex",flexDirection:"column"}}>
        {/* 头 */}
        <div style={{height:50,backgroundColor:"rgb(204, 204, 204)"}}>
            <div>头</div>
        </div>
        {/* 中 */}
        <div style={{height:50,backgroundColor:"red",display:"flex",flex:"1 1 auto"}}>
            <div style={{width:81}}>左</div>
            <div>中</div>
            <div>右</div>
        </div>
        {/* 脚 */}
        <div style={{height:50,backgroundColor:"blue"}}>
            <div>脚</div>
        </div>
    </div>
);

export default Edit;