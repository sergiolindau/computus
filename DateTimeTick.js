function DateTimeTick() {
	var x = new DateTime();
	x.__proto__ = DateTimeTick.prototype;
	x.__proto__.runModeNow = true;
	x.__proto__.stepSize = 1;
	x.__proto__.setStepSize = function(step) {
		x.__proto__.stepSize = step;
	}
	x.__proto__.stepDateTime = 4;
	x.__proto__.setStepDateTime = function(step) {
		x.__proto__.stepDateTime = step;
	}
	x.__proto__.setRunModeNow = function(now, interval, stepsize, stepfield) {
		if (now != x.__proto__.runModeNow) {
			var state = x.__proto__.isRunning();
			if (state) x.__proto__.tick.runStop();
			x.__proto__.runModeNow = now;
			if (arguments.length>1) x.__proto__.tick.setInterval(interval);
			if (arguments.length>2) x.__proto__.stepSize = stepsize;
			if (arguments.length>3) x.__proto__.stepDateTime = stepfield;
			if (state) x.__proto__.tick.runStop();
		}
	}

	x.__proto__.runAction = function(date){console.log("default DateTimeTick.runAction()");};
	x.__proto__.setRunAction = function(func){
		x.__proto__.runAction = func;
	};
	x.__proto__.startAction = function(date){console.log("default DateTimeTick.startAction()");};
	x.__proto__.setStartAction = function(func){
		x.__proto__.startAction = func;
	};
	x.__proto__.stopAction = function(date){console.log("default DateTimeTick.stopAction()");};
	x.__proto__.setStopAction = function(func){
		x.__proto__.stopAction = func;
	};
	var runAction = function(){
		if (x.__proto__.runModeNow) {
			x.setNow();
		}
		else {
			if (x.__proto__.tick.isRunning()) {
				switch (x.__proto__.stepDateTime) {
					case 0:
						break;
					case 1:
						x.incSeconds(x.__proto__.stepSize);
						break;
					case 2:
						x.incMinutes(x.__proto__.stepSize);
						break;
					case 3:
						x.incHours(x.__proto__.stepSize);
						break;
					case 4:
						x.incDate(x.__proto__.stepSize);
						break;
					case 5:
						x.incMonth(x.__proto__.stepSize);
						break;
					case 6:
						x.incYear(x.__proto__.stepSize);
						break;
					default:
				}
			}

		}

//		x.__proto__.runAction(x);
		x.runAction(x);
	};
	var startAction = function(){
		x.__proto__.startAction(x);
	};
	var stopAction = function(){
		x.__proto__.stopAction(x);
	};
	x.__proto__.tick = new Tick(runAction, startAction, stopAction);
	x.__proto__.run = x.__proto__.tick.run;
	x.__proto__.stop = x.__proto__.tick.stop;
	x.__proto__.runStop = x.__proto__.tick.runStop;
	x.__proto__.setInterval = x.__proto__.tick.setInterval;
	x.__proto__.isRunning = x.__proto__.tick.isRunning;
	return x;
}
DateTimeTick.prototype.__proto__ = DateTime.prototype;