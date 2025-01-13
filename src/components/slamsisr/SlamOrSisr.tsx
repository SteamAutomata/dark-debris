import { Fragment, useEffect, useState } from "react"

export default function SlamOrSisr() {
	const [visible, setVisible] = useState(false)
	const [promptContent, setPromptContent] = useState(
		"Configurer des routeurs ?"
	)
	const [chatbotOutput, setChatbotOutput] = useState("")
	const [loading, setLoading] = useState(false)

	function handleSubmit(e: any) {
		e.preventDefault()
		setLoading(true)
		fetch("/api/ask-slam-sisr", { body: promptContent, method: "POST" }).then(
			async v => {
				setLoading(false)
				setChatbotOutput(await v.text())
			}
		)
	}

	useEffect(() => {})

	const panelInput = (
		<>
			<textarea
				value={promptContent}
				onChange={e => setPromptContent(e.target.value)}
			/>
			<button onClick={handleSubmit}>Demander</button>
		</>
	)

	const load = (
		<div role="status" className="max-w-sm animate-pulse">
			<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
			<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
			<span className="sr-only">Loading...</span>
		</div>
	)

	const panel = (
		<div className="bg-gray-950 bg-opacity-30 fixed w-full h-full left-0 top-0 flex justify-center">
			<div className="flex flex-col justify-center p-4 rounded-lg border-slate-400 gap-2 m-auto bg-slate-300 shadow-indigo-950 shadow-lg">
				<p>SLAM ou SISR ?</p>
				<p>{chatbotOutput}</p>
				{!loading ? panelInput : load}
			</div>
		</div>
	)

	return (
		<>
			{visible ? panel : <Fragment />}
			<div>
				<button
					type="button"
					className="rounded-full fixed right-6 size-11 bottom-6 btn"
					onClick={() => setVisible(!visible)}
				>
					<span>?</span>
				</button>
			</div>
		</>
	)
}
// rounded-full shadow-indigo-950 shadow-lg size-11 fixed right-6 bottom-6 bg-indigo-700 text-white
