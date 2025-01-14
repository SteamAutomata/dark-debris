import React, { Fragment, useEffect, useState, type ReactNode } from "react"
import { Audios } from "../sounds"

function SearchIcon() {
	return (
		<svg
			width="17"
			height="16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-labelledby="search"
			className="stroke-black"
		>
			<path
				d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
				stroke="currentColor"
				stroke-width="1.333"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	)
}

function PopupWindow({ children }: { children: ReactNode }) {
	return (
		<div className="bg-opacity-0 fixed w-full h-full left-0 top-0 flex justify-center items-center">
			<div className="bg-opacity-100 bg-slate-50 text-black dark:bg-slate-800 dark:text-white rounded-lg p-8 w-fit h-fit flex flex-col justify-center">
				{children}
			</div>
		</div>
	)
}

function ToggleButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="button"
			className="rounded-full shadow-indigo-950 shadow-lg size-11 fixed right-6 bottom-6 bg-indigo-700 text-white cursor-pointer"
			{...props}
		>
			<span>?</span>
		</button>
	)
}

function useTypewriter(
	initialTarget: string,
	delay: number
): [string, React.Dispatch<React.SetStateAction<string>>, string] {
	const [target, setTarget] = useState(initialTarget)
	const [currentText, setCurrentText] = useState("")

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
	}, [currentText])

	useEffect(() => {
		setCurrentText("")
	}, [target])

	return [currentText, setTarget, target]
}

function SpeechBubble({
	text,
	visible,
	playSounds,
}: {
	text: string
	visible: boolean
	playSounds: boolean
}) {
	useEffect(() => {
		if (playSounds)
			if (visible) {
				Audios.APPEAR.play()
			} else {
				Audios.DISAPPEAR.play()
			}
	}, [visible])

	console.log(visible)
	const animation = visible ? "jumpscare" : "reverse-jumpscare"

	return <div className={`speech-bubble ${animation}`}>{text}</div>
}

export default function SlamOrSisr() {
	const [visible, setVisible] = useState(false)
	const [promptContent, setPromptContent] = useState(
		"Configurer des routeurs ?"
	)
	const [loading, setLoading] = useState(true)

	const [typewriter, setTypewriter, targetTypewriter] = useTypewriter("", 100)
	const [typewritervisible, setTypewriterVisible] = useState(
		targetTypewriter !== ""
	)
	const [playSounds, setPlaySounds] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (typewriter === targetTypewriter) {
				setTypewriterVisible(false)
				setPlaySounds(true)
			}
		}, 3000)

		return () => clearTimeout(timeout)
	}, [typewriter, targetTypewriter])

	function handleSubmit(e: any) {
		console.log("Tried submit")
		e.preventDefault()
		setLoading(true)
		fetch("/api/ask-slam-sisr", { body: promptContent, method: "POST" }).then(
			async v => {
				console.log("received")
				setLoading(false)
				setPlaySounds(true)
				setTypewriterVisible(true)
				setTypewriter(await v.text())
			}
		)
	}

	function toggleVisibility() {
		setPlaySounds(false)
		setVisible(!visible)
	}

	if (!visible) {
		return <ToggleButton onClick={toggleVisibility} />
	}

	return (
		<>
			<PopupWindow>
				<p>Posez moi des questions!</p>

				<div className="rounded-full flex bg-white dark:bg-indigo-900 items-center p-2">
					<form onSubmit={handleSubmit}>
						<input
							placeholder="Type your text"
							type="text"
							value={promptContent}
							onChange={e => setPromptContent(e.target.value)}
							className="bg-transparent border-none focus:outline-none"
							onSubmit={handleSubmit}
						/>
					</form>
					<SearchIcon />
				</div>
				<ToggleButton onClick={toggleVisibility} />
				{typewriter !== "" ? (
					<SpeechBubble
						playSounds={playSounds}
						visible={typewritervisible}
						text={typewriter}
					/>
				) : null}
			</PopupWindow>
		</>
	)
}
// rounded-full shadow-indigo-950 shadow-lg size-11 fixed right-6 bottom-6 bg-indigo-700 text-white
