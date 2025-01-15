import { useEffect, useState } from "react"
import { Audios } from "../sounds"

export default function useTypewriter(target: string, delay: number): [string] {
	const [currentText, setCurrentText] = useState("")
	console.log(target)

	useEffect(() => {
		if (currentText.length < target.length) {
			const timeout = setTimeout(() => {
				new Audio(Audios.CLICK.src).play()
				let newIndex = currentText.length
				while (newIndex < target.length && target[newIndex] !== " ") {
					newIndex++
				}
				setCurrentText(prevText => target.slice(0, newIndex + 1))
			}, delay)
			return () => clearTimeout(timeout)
		}
	}, [currentText, target])

	useEffect(() => {
		setCurrentText("")
	}, [target])

	return [currentText]
}
