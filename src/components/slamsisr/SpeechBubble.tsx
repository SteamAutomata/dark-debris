import { useEffect } from "react"
import { Audios } from "../sounds"
import useTypewriter from "./useTypewriter"

export default function SpeechBubble({
	text,
	visible,
	playSounds,
}: {
	text: string
	visible: boolean
	playSounds: boolean
}) {
	const [typewriter] = useTypewriter(text, 70)

	useEffect(() => {
		if (playSounds)
			if (visible) {
				Audios.APPEAR.play()
			} else {
				Audios.DISAPPEAR.play()
			}
	}, [visible])

	const animation = visible ? "jumpscare" : "reverse-jumpscare"

	return <div className={`speech-bubble ${animation}`}>{typewriter}</div>
}
