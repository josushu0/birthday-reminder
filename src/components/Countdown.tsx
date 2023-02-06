import dayjs from "dayjs"
import { useEffect, useState } from "react"

function addZeros(number: number): string {
	const numberString = number.toString()
	if (numberString.length >= 2) return numberString
	return "0" + numberString
}

function Countdown({date}: {date: dayjs.Dayjs}) {
	const [countdown, setCountdown] = useState({
		days: '00',
		hours: '00',
		minutes: '00',
		seconds: '00'
	})

	useEffect(() => {
		const today = dayjs()
		const interval = setInterval(() => {
			setCountdown({
				days: addZeros(date.diff(today, "days")),
				hours: addZeros(date.diff(today, "hours") % 24),
				minutes: addZeros(date.diff(today, "minutes") % 60),
				seconds: addZeros(date.diff(today, "seconds") % 60)
			})
		}, 1000)
		return () => clearInterval(interval)
	}, [countdown])

	return (
		<div className="countdown">
			<span>{countdown.days}:</span>	
			<span>{countdown.hours}:</span>	
			<span>{countdown.minutes}:</span>	
			<span>{countdown.seconds}</span>	
		</div>
	)
}

export default Countdown
