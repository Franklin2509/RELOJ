
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var radius = canvas.height / 2;
context.translate(radius, radius);
radius = radius * 0.90


setInterval(drawClock,1000);

function drawClock() {
    drawFace(context,radius);
    drawNumbers(context,radius);
    drawTime(context,radius);
}

function drawFace(ctx, radius) {
    var grad;
    
    context.beginPath();
    context.arc(0, 0, radius, 0, 2*Math.PI);
    context.fillStyle = 'yellow';
    context.fill();

    grad = context.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    context.strokeStyle = grad;
    context.lineWidth = radius*0.1;
    context.stroke();

    context.beginPath();
    context.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    context.fillStyle = '#333';
    context.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    context.font = radius*0.15 + "px arial";
    context.textBaseline="middle";
    context.textAlign="center";
    
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        context.rotate(ang);
        context.translate(0, -radius*0.85);
        context.rotate(-ang);
        context.fillText(num.toString(), 0, 0);
        context.rotate(ang);
        context.translate(0, radius*0.85);
        context.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}