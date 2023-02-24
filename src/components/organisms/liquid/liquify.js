import Decimal from "decimal.js";

export class Liquify {
	constructor(canvas ,w, h, percentage){
		this.canvas = canvas;
		this.canvas.width = w;
		this.canvas.height = h;
		this.antiAliasing();
		this.radius = Math.floor(w/2);
		this.w = w;
		this.h = h;
		this.ctx = this.canvas.getContext("2d");
		this.xBasicRaduisMovedTimes = 0;
		this.originCotrolPoints = [];
		this.points = [];
		this.state = "negative";
		this.difference = 0;
		this.changePerFrame = 1;
		this.maximunControlPointChange = Math.floor((h/6)*100)/100;
		this.minimunControlPointChange = -Math.floor((h/6)*100)/100;
		this.fillHeightEachTime = this.radius*2*percentage/100;
		this.fillCountdowEachTime = new Decimal(percentage/100);
		this.filled = new Decimal(0);
		this.percentage = percentage;
		this.currentWaterColorRGB = [255, 0, 0];
		this.currentTextColorRGB = [255, 0, 0];
		this.ctx.fillStyle = this.getCurrentColor();
		this.ctx.strokeStyle = this.getCurrentColor();
		this.xTranslated = 0;
		this.yTranslated = 0;
		this.clipCirclePath = this.getClipCirclePath(w, h);
		this.ctx.clip(this.clipCirclePath);
		this.initializePoints();
		this.surroundingCirclePath = this.getOuterSurroundingCirclePath(w, h);
		this.ctx.font = "bolder 50px sans-serif";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.colorRGBUnit = Math.floor((255*percentage)/100);
		this.fillCompleted = false;
		this.requestAnimationFrameId = null;
		this.isAnimating = false;
		// this.animate();
	}

	initializePoints = () => {
		const { w, h } = this;
		const basicRaduis = w*0.75;
		const basicHeight = h/3;
		const fullHeight = 0;

		this.basicRaduis = basicRaduis;
		// this.liquidTranslate(-basicRaduis, this.radius*2);
		this.liquidTranslate(-basicRaduis, this.radius*2);

		for(let i = 0; i <= 5; i++) {
			this.points.push({
				start: { x: i*basicRaduis, y: fullHeight },
				cp1: { x: i*basicRaduis + basicRaduis*0.25, y: fullHeight},
				cp2: { x: i*basicRaduis + basicRaduis*0.75, y: fullHeight},
				end: { x: (i+1)*basicRaduis, y: fullHeight }
			});
		}

		for(let i = 0; i <= 5; i++) {
			this.originCotrolPoints.push({
				start: { x: i*basicRaduis, y: fullHeight },
				cp1: { x: i*basicHeight + basicRaduis*0.25, y: fullHeight},
				cp2: { x: i*basicHeight + basicRaduis*0.75, y: fullHeight},
				end: { x: (i+1)*basicRaduis, y: fullHeight }
			});
		}
	};
	
	updateColor = () => {
		if (!this.fillCompleted && this.currentWaterColorRGB[0] <= 255 && this.currentWaterColorRGB[0] >= 0) {
			this.currentWaterColorRGB[0] -= 2*this.colorRGBUnit;
			this.currentWaterColorRGB[2] += 2*this.colorRGBUnit;
			this.currentTextColorRGB[0] -= 2*this.colorRGBUnit;
			this.currentTextColorRGB[1] += 2*this.colorRGBUnit;
			this.currentTextColorRGB[2] += 2*this.colorRGBUnit;
		}
	};

	getCurrentColor = () => {
		const { currentWaterColorRGB } = this;
		return `rgb(${currentWaterColorRGB[0]},${currentWaterColorRGB[1]},${currentWaterColorRGB[2]})`;
	};
	antiAliasing = () => {
		const { canvas } = this;
		const width = canvas.offsetWidth;
		const height = canvas.offsetHeight;
		// console.log(window.devicePixelRatio, height)
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		canvas.height = height * window.devicePixelRatio;
		canvas.width = width * window.devicePixelRatio;
		// ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	};

	getCurrentTextColor = () => {
		const { currentTextColorRGB } = this;
		return `rgb(${currentTextColorRGB[0]},${currentTextColorRGB[1]},${currentTextColorRGB[2]})`;
	};

	updateControlPoints = () => {
		const { points, changePerFrame, originCotrolPoints } = this;

		if (this.state === "positive") {
			this.difference -= changePerFrame;
		}

		if (this.state === "negative") {
			this.difference += changePerFrame;
		}

		if (this.difference >= this.maximunControlPointChange) {
			this.state = "positive";
		}

		if (this.difference <= this.minimunControlPointChange) {
			this.state = "negative";
		}

		points.forEach((p, i) => {
			p.cp1.y = originCotrolPoints[i].cp1.y + this.difference;
			p.cp2.y = originCotrolPoints[i].cp2.y - this.difference;
		});
	};
	
	getClipCirclePath = (w, h) => {
		const path = new Path2D();
		path.arc(w/2, h/2, this.radius, 0 , 2*Math.PI);
		return path;
	};

	getOuterSurroundingCirclePath = (w, h) => {
		const path = new Path2D();
		path.arc(w/2, h/2, this.radius, 0 , 2*Math.PI);
		return path;
	};

	drawText= () => {
		const { ctx, w, xTranslated, filled, yTranslated  } = this;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.getCurrentTextColor();
		ctx.fillText(`${ (filled*100).toFixed(1) }%`, w/2 -xTranslated , w/2 - yTranslated);
		ctx.closePath();
		ctx.restore();
	};

	drawLiquid = () => {
		
		const { w, h, ctx, points } = this;
		const waterColor =  this.getCurrentColor();
		// drawWave
		// console.log(w, h)
		ctx.clearRect(-this.xTranslated, -this.yTranslated, w, h);
		ctx.save();
		ctx.fillStyle = waterColor;
		ctx.beginPath();
		ctx.moveTo(points[0].start.x, points[0].start.y);
		points.forEach(p => {
			const { cp1, cp2, end } = p;
			ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
		});
		ctx.lineTo(points[2].end.x, h);
		ctx.lineTo(0, h);
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.lineWidth  = 20;
		ctx.arc(w/2 - this.xTranslated, w/2 - this.yTranslated, this.radius, 0 , 2*Math.PI);
		ctx.stroke();

		ctx.strokeStyle = waterColor;
		ctx.lineWidth  = 10;
		ctx.arc(w/2 - this.xTranslated, h/2 - this.yTranslated, this.radius, 0 , 2*Math.PI);
		ctx.stroke();

		this.drawText();
	};

	xAnimate = () => {
		if (this.difference !== 0) {
			this.liquidTranslate(1, 0);
		}

		if (this.difference === 0 && this.state === "negative") {
			if (this.xBasicRaduisMovedTimes >= 3) {
				this.xBasicRaduisMovedTimes = 0 ;
				this.liquidTranslate(-this.xTranslated-this.basicRaduis, 0);
			} else {
				this.xBasicRaduisMovedTimes += 1;
				this.liquidTranslate(-this.basicRaduis, 0);
			}
		}
	};

	yAnimate = () => {
		if (this.filled.lessThan(this.percentage)) {
			this.filled = this.filled.plus(this.fillCountdowEachTime);
			this.liquidTranslate(0, -this.fillHeightEachTime);
		}
	};

	checkCompleted = () => {
		if (!this.filled.lessThan(this.percentage)) {
			this.fillCompleted = true;
		}
	};

	liquidTranslate = (x, y) => {
		this.ctx.translate(x, y);
		this.xTranslated += x;
		this.yTranslated += y;
	};

	draw = () => {
		this.updateControlPoints();
		this.updateColor();
		this.xAnimate();
		this.yAnimate();
		this.checkCompleted();
		this.drawLiquid();
	};

	// draw = async () => {
	// 	await this.updateControlPoints();
	// 	this.updateColor();
	// 	this.xAnimate();
	// 	this.yAnimate();
	// 	this.checkCompleted();
	// 	this.drawLiquid();
	// };

	animate = () => {
		this.draw();
		window.ctx = this.ctx;
		this.requestAnimationFrameId = requestAnimationFrame(this.animate);
	};

	stopAnimte = () => {
		cancelAnimationFrame(this.requestAnimationFrameId);
	};
} 