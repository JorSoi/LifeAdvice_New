import { useEffect, useState } from "react"

const usePlaceholderAnimation = (texts : string[]) => {

    const [placeholderText, setPlaceholderText] = useState<string>('');
    const [currentTextIndex, setTextIndex] = useState(0);
    const ms = 130 //determines the speed of the animation
    const infiniteLoop = false



    function writeText (text : string) {
        return new Promise((resolve) => {
            const textArray = text.split('');
            textArray.forEach((letter, index) => {
                setTimeout(() => {
                    setPlaceholderText((prev) => prev + letter)

                    //Only resolving when last letter animation and pause are completed
                    if(index == textArray.length - 1) {
                        setTimeout(() => {
                            resolve(text)
                        }, ms*25)
                    }
                }, index * ms)
            })
        })

    }

    function deleteText(text : string) {
        return new Promise((resolve) => {
            const textArray = text.split('');
            let removedLetters = 0;
        
            const interval = setInterval(() => {

                setPlaceholderText((prev) => {
                    let updatedText = prev.split('').slice(0, prev.length - 1).join('');
                    return updatedText;
                });
                removedLetters++;

                //Only resolving when last letter has been deleted and pause is completed
                if (removedLetters === textArray.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        resolve('deleteText completed')
                    }, ms*12)
                    
                }
            }, ms*0.3);
        })

    }

    useEffect(() => {

        if(currentTextIndex < texts.length - 1) {
            writeText(texts[currentTextIndex]).then((previouslyWrittenText : any) => deleteText(previouslyWrittenText).then(() => setTextIndex(currentTextIndex + 1)))
        } else {
            infiniteLoop ? setTextIndex(0) : null
        }


    }, [currentTextIndex])

    return placeholderText
}

export default usePlaceholderAnimation;