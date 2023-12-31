﻿const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const eraser = document.getElementById('jsEraser');
const saveBtn = document.getElementById('jsSave');
const clearBtn = document.getElementById('jsClear');
const colorCrcl = document.getElementById('jsColorCircle');

let INITIAL_COLOR = '#141414';

canvas.height = 500;
canvas.width = 800;

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    x = event.offsetX;
    y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function hanndleCM(event){
    event.preventDefault();
}

function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "mypicture";
    link.click();
}

function handleClear(){
    if(confirm("Вы уверены?")) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


if(canvas){
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', hanndleCM);
}

function handleCircleColor(event){
    const colorC = event.target.value;
    ctx.strokeStyle = colorC;
    ctx.fillStyle = colorC;
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colorCrcl.value = '#' + ctx.strokeStyle.substring(1);
}

function handleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = 'Bucket';
    }
    else{
        filling = true;
        mode.innerText = 'Drawing';
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleEraser(){
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    colorCrcl.value = '#' + ctx.strokeStyle.substring(1);
    ctx.lineWidth = 6.0;
    range.value = 6.0;
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range){
    range.addEventListener('input', handleRangeChange);
}

if (mode){
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSave);
}

if(clearBtn){
    clearBtn.addEventListener('click', handleClear);
}

if(colorCrcl){
    colorCrcl.addEventListener('input', handleCircleColor);
}

if (eraser){
    eraser.addEventListener('click', handleEraser);
}