import React, {useEffect, useState} from "react";
import "./myTimer.css";

function MyTimer (props) {
	const [time, setTime] = useState(+props.time);
	const [autoStart, setTimeStart] = useState(props.autoStart);
	const step = +props.step;
	let interval = null;

	function onToggle(){
		setTimeStart(!autoStart);
		if (props.onTimeStart && !autoStart) {
			if (time) props.onTimeStart(time/1000)
		}
	}

	function reset(){
		setTimeStart(autoStart);
		setTime(props.time);
		if (props.onTimeStart && autoStart) {
			if (time) props.onTimeStart(time/1000)
		}
	}

	useEffect(() => {
		if (autoStart && time > 0) {
			interval = setInterval(() => {
				setTime((time) => (time - step));
			}, step);
		} else if (time <= 0 || !autoStart) {
			clearInterval(interval);
			if (props.onTimePause) props.onTimePause()
			if (props.onTimeEnd) {
				if (time <= 0 ) props.onTimeEnd()
			}
		}
		if (props.onTick) {
			if (time >= 1) props.onTick(time)
		}

		return () => {
			clearInterval(interval);
		};
	}, [autoStart, time]);

	return (
			<div className={"timer-wrapper"}>
				<div className="time">{time/1000}</div>
				<button onClick={onToggle}>
					{autoStart ? 'PAUSE' : 'START'}
				</button>
				<button onClick={reset}>
					RESET
				</button>
				<div className="progress">
					<div className="progress-done" style={{width: `${time * 100 / props.time}%`}}>
						{`${time * 100 / props.time}%`}
						{/*{props.time/1000-time/1000} passed*/}
					</div>
				</div>
			</div>
	)
}

export default MyTimer;