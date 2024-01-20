import { useEffect, useState } from "react"

// Returns status based on the length of the text to determine when to show text limit in the textArea.
const useTextLimit = (limit : number, text: string) => {
    const [status, setStatus] = useState<'hidden' | 'warn' | 'stop'>('hidden');

    useEffect(() => {
        if(text.length > 0.8 * limit) {
            setStatus('stop');
        } else if (text.length > 0.5 * limit) {
            setStatus('warn');
        } else {
            setStatus('hidden');
        }
    }, [text])

    return status
}

export default useTextLimit