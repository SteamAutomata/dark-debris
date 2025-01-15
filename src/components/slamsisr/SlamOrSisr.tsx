import React, { Fragment, useEffect, useState, type ReactNode } from "react"
import { Audios } from "../sounds"
import SpeechBubble from "./SpeechBubble"

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

function PopupWindow({
	children,
	visible,
}: {
	children: ReactNode
	visible: boolean
}) {
	return (
		<div
			style={{
				opacity: visible ? "100%" : 0,
				pointerEvents: visible ? "auto" : "none",
			}}
			className="bg-opacity-0 fixed w-full h-full left-0 top-0 flex justify-center items-center"
		>
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

function TextBox({
	handleSubmit,
}: {
	handleSubmit: (e: any, input: string) => void
}) {
	const [promptContent, setPromptContent] = useState(
		"Configurer des routeurs ?"
	)
	return (
		<div className="rounded-full flex bg-white dark:bg-indigo-900 items-center p-2">
			<form onSubmit={e => handleSubmit(e, promptContent)}>
				<input
					placeholder="Type your text"
					type="text"
					value={promptContent}
					onChange={e => setPromptContent(e.target.value)}
					className="bg-transparent border-none focus:outline-none"
				/>
			</form>
			<SearchIcon />
		</div>
	)
}

export default function SlamOrSisr() {
	const [visible, setVisible] = useState(false)
	const [llmOutput, setLlmOutput] = useState("")
	const [playSounds, setPlaySounds] = useState(false)

	function toggleVisible() {
		setVisible(!visible)
	}

	async function handleSubmit(e?: any, text?: string) {
		if (e) e.preventDefault()
		if (llmOutput !== "") return
		setPlaySounds(true)
		setLlmOutput("...")

		fetch("/api/ask-slam-sisr", { body: text, method: "POST" }).then(
			async v => {
				setLlmOutput(await v.text())
				setTimeout(() => {
					setLlmOutput("")
				}, 4000)
			}
		)

		setTimeout(() => {
			setLlmOutput("")
		}, 4000)
	}

	return (
		<>
			<PopupWindow visible={visible}>
				<h3>Posez moi une question!</h3>
				<SpeechBubble
					playSounds={playSounds}
					visible={llmOutput !== ""}
					text={llmOutput}
				/>
				<TextBox handleSubmit={handleSubmit} />
			</PopupWindow>
			<ToggleButton onClick={toggleVisible} />
		</>
	)
}

/* export default function Character() {


	const [visible, setVisible] = useState(false)
	const [promptContent, setPromptContent] = useState(
		"Configurer des routeurs ?"
	)
	const [debounce, setDebounce] = useState(true)

	const [typewritervisible, setTypewriterVisible] = useState(
		targetTypewriter !== ""
	)
	const [playSounds, setPlaySounds] = useState(false)

	function handleSubmit(e: any) {
		e.preventDefault()
		if (!debounce) {
			return
		}
		setDebounce(false)
		console.log("Tried submit")
		fetch("/api/ask-slam-sisr", { body: promptContent, method: "POST" }).then(
			async v => {
				console.log("received")
				setTypewriterVisible(true)
				setPlaySounds(true)
				setTypewriter(await v.text())
				setTimeout(() => {
					setDebounce(true)
					setTypewriterVisible(false)
					setPlaySounds(true)
				}, 4000)
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

				
				<ToggleButton onClick={toggleVisibility} />
				<SpeechBubble
					playSounds={playSounds}
					visible={typewritervisible}
					text={typewriter}
				/>
			</PopupWindow>
		</>
	)
} */
// rounded-full shadow-indigo-950 shadow-lg size-11 fixed right-6 bottom-6 bg-indigo-700 text-white
