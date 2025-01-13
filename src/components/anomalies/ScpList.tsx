import { useState } from "react"
import DangerAlert from "../../layouts/DangerAlert.astro"

export default function ScpList() {
	const [scps, setScps] = useState(undefined as Array<any> | undefined)
	const [err, setErr] = useState(undefined)

	if (err) {
		//return <DangerAlert />
	}

	if (!scps) {
		return (
			<div className="card">
				<div role="status" className="space-y-2.5 animate-pulse max-w-lg">
					<div className="flex items-center w-full">
						<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
					</div>
					<div className="flex items-center w-full max-w-[480px]">
						<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
					</div>
					<div className="flex items-center w-full max-w-[400px]">
						<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
						<div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
					</div>
					<div className="flex items-center w-full max-w-[480px]">
						<div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
					</div>
					<div className="flex items-center w-full max-w-[440px]">
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
						<div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
					</div>
					<div className="flex items-center w-full max-w-[360px]">
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
						<div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
						<div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
					</div>
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		)
	}

	return (
		<div className="card">
			{scps.map(scp => (
				<a href={`/anomalies/${scp.id}`}>
					<h3>
						SCP-{scp.id} : {scp.title}
					</h3>
					<h3>Containment Class: {scp.class}</h3>
				</a>
			))}
		</div>
	)
}
