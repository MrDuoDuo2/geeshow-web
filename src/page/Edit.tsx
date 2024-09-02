import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditableDivWithLineNumbers from './Editor';

const handleContentEditable = (event: React.FormEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.innerHTML)
}

const Edit: React.FC = () => {
    const [content, setContent] = useState('');
    const [lines, setLines] = useState(Number);
    const [returnContent, setReturnContent] = useState('');

    const HtmlElement = React.createElement('div',{
        dangerouslySetInnerHTML: {__html: returnContent},
    })

    const handleContentChange = (content: string, initialLines: number, returnContent: string) => {
        // console.log("content", content);
        // console.log("initialLines", initialLines);
        // console.log("returnContent", returnContent);
        setLines(initialLines);
        setReturnContent(returnContent);
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ height: 50, backgroundColor: 'rgb(204, 204, 204)', borderBottom: "1px solid", display: "flex" }}>
                <Box sx={{ width: 37 }}>Logo</Box>
                <Box sx={{ flexGrow: 1 }}>标题</Box>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: "auto", background: 'white',height:"100%", display: "flex", }}>
                <Box sx={{ width: 81, borderRight: "1px solid" }}>左</Box>
                <Box sx={{ width: 329, borderRight: "1px solid" }}>中</Box>
                <Box sx={{ flexGrow: 1, display: "flex",flexDirection: 'column'}}>
                    <Box sx={{height:41,width:"100%",background: "#8E8D8D",flexShrink: 0}}></Box>
                    <Box sx={{ display: "flex",height:"100%",overflow:"auto" }}>
                        <Box  id="bottom"  sx={{ flex: 1,borderRight: "1px solid",height:"100%", display: "flex"}}>
                            <EditableDivWithLineNumbers onValueChange={handleContentChange} />
                        </Box>
                         
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ height:"100%", overflowY:"auto"}}>
                            { HtmlElement }
                            </Box>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
            <Box sx={{ height: 45, backgroundColor: 'blue', background: 'white', borderTop: "1px solid" }}>

                Line:{lines}
            </Box>
        </Box>
    );
};

export default Edit;