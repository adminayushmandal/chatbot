'use client'

import { Fragment, useCallback, useState } from "react";
import { dataBot } from "@/lib/gemini/dataBot";

export const ChatWindow = () => {

    const [userPrompt, setUserPrompt] = useState('')

    const dataBotHandler = useCallback(async () => {
        try {
            const response = await dataBot({ userPrompt: userPrompt, environment: "Windows_Live", servers: "CTS03" })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }, [userPrompt])

    return <Fragment>
        <h1 className="text-3xl font-semibold">Chat window</h1>
        <input type="text" placeholder="Type here" className="input input-sm" value={userPrompt} onChange={e => setUserPrompt(e.target.value)} />
        <button type="button" className="btn btn-primary btn-sm" onClick={dataBotHandler}>Send</button>
    </Fragment>
}