import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { tagger } from 'gee_tagger';

interface LineNumberProps {
    onValueChange: (content: string, lines: number, returnString: string) => void;
}

function EditableDivWithLineNumbers({ onValueChange }: LineNumberProps) {
    const [content, setContent] = useState('');
    const [lines, setLines] = useState<number[]>([1]);
    const [returnString, setReturnString] = useState('');

    const defaultContent = '<div id="abc"><br /></div>';
    const datachange = () => {
        //获取当前编辑器中的内容
        let domlist = document.getElementById('editer');

        if (domlist == null) return;
        const htmlContent = domlist.innerHTML;
        const geetaggerReturn = tagger(domlist.innerText);

        setReturnString(geetaggerReturn);
        setContent(htmlContent);

        let brTags = domlist.childNodes.length == 0 ? 1 : domlist.childNodes.length; // 减去最后一个空字符串
        brTags < 0 ? brTags = 0 : null
        const newLines = Array.from({ length: brTags }, (_, i) => i + 1);

        setLines(newLines);
        onValueChange(htmlContent, brTags + 1, geetaggerReturn);
    }


    const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
        if (event.currentTarget.childNodes.length == 0) {
            event.currentTarget.innerHTML = defaultContent;
        }
        // console.log(event)
        datachange();
    };

    /**
     * 处理代码框按钮点击事件
     *
     * @returns 无返回值
     */
    function handleButtonClick() {
        //获取编辑框
        const originalElement = document.getElementById('editer');
        if (originalElement == null) return;

        //获取选中的内容
        let selecTion = window.getSelection();
        if (selecTion != null) {
            var range = selecTion.getRangeAt(0);
            if (selecTion.isCollapsed) {
                if(selecTion.anchorNode == null) return;
                
                //selecTion.anchorNode 的类型为文本就需要获取父节点，其他就直接获取
                let index = 0;
                if(selecTion.anchorNode.nodeType === 3){
                    let select = selecTion.anchorNode.parentNode;
                    if(select === null)return;
                    index = Array.prototype.indexOf.call(select.parentNode?.childNodes, select);
                } else{
                    let select = selecTion.anchorNode
                    if(select === null)return;
                    index = Array.prototype.indexOf.call(select.parentNode?.childNodes, select);
                }

                const codeSpan = document.createElement('div');
                const codeSpanContent = document.createElement('span');
                codeSpanContent.textContent = "---";
                codeSpan.appendChild(codeSpanContent);

                //若是最后一行直接apppend，若非最后一行则插入
                if (index == originalElement.childNodes.length - 1) {

                    originalElement.appendChild(codeSpan.cloneNode(true));
                }else{
                    originalElement.insertBefore(codeSpan.cloneNode(true), originalElement.childNodes[index + 1]);
                }

                originalElement.insertBefore(codeSpan.cloneNode(true), originalElement.childNodes[index])
            } else {
                //获取开始和结束的元素
                const start = range.startContainer.parentNode;
                let startIndex = 0;
                let endIndex = 0;
                for (let index = 0; index < originalElement.childNodes.length; index++) {
                    const chileNode = originalElement.childNodes[index];

                    if (chileNode.isEqualNode(start) ) {
                        startIndex = index;
                    }
                    if (chileNode.isEqualNode(range.endContainer)) {
                        endIndex = index;
                    }
                }

                
                const codeSpan = document.createElement('div');
                const codeSpanContent = document.createElement('span');
                codeSpanContent.textContent = "---";
                codeSpan.appendChild(codeSpanContent);

                originalElement.insertBefore(codeSpan.cloneNode(true), originalElement.childNodes[endIndex]);
                // originalElement.insertBefore(codeSpan.cloneNode(true), originalElement.childNodes[startIndex])

            }
            datachange();
        }
    }

    /**
     * 处理标题按钮点击事件
     *
     * @returns 无返回值
     */
    function handleTitleButtonClick() {

        const originalElement = document.getElementById('editer');
        if (originalElement == null) return;
        let selecTion = window.getSelection();
        if (selecTion != null) {
            var range = selecTion.getRangeAt(0);
            if (range.startContainer == range.endContainer) {
                range.startContainer.textContent = "== " + range.startContainer.textContent;

            } else {
                //获取开始和结束的元素
                const start = range.startContainer;
                let startIndex = 0;
                for (let index = 0; index < originalElement.childNodes.length; index++) {
                    const chileNode = originalElement.childNodes[index];
                    if (chileNode == start) {
                        startIndex = index;
                    }
                }

                const newStart = document.createElement('div');
                newStart.id = 'abc';
                const childNode = document.createElement('span');
                //拼接选中行的内容
                let newContent = "";
                newContent += "== ";
                newContent += range.toString();
                childNode.textContent = newContent;
                newStart.appendChild(childNode);

                selecTion.deleteFromDocument();
                range.insertNode(newStart);

            }
            datachange();
        }

    }



    function test(){
        let select = window.getSelection()
        console.log(select);
        console.log(select?.focusNode)
        console.log(select?.focusNode?.parentNode?.childNodes)
        let index = Array.prototype.indexOf.call(select?.anchorNode?.parentNode?.childNodes, select?.anchorNode)
        console.log(index)
        console.log(select?.focusNode?.nodeType)
        // console.log(select?.focusNode?.parentNode?.childNodes[3].isSameNode(select?.focusNode))
    }

    return (
        <Box sx={{ flex: 1, borderRight: "1px solid", display: "flex", height: "100%" }}>
            <Button variant="outlined" onClick={handleButtonClick}>Outlined</Button>
            {/* 行号导航栏 */}
            <Box sx={{ width: 40, height: "100%", borderRight: "1px solid" }}>
                {lines.map((line, index) => {
                    return (
                        <Typography key={index} sx={{ textAlign: "right", marginRight: 1 }}>
                            {line}
                        </Typography>
                    );
                })}
            </Box>
            {/* 编辑区 */}
            <div
                contentEditable="true"
                style={{ width: "100%",outline: "none", height: "100%", marginLeft: 2,overflowY: "auto" }}
                suppressContentEditableWarning={true}
                onInput={handleContentChange}
                id='editer'>
                <div id="abc">
                    <br />
                </div>
            </div>
        </Box>

    );
};



export default EditableDivWithLineNumbers;