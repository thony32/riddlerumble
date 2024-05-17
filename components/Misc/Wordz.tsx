/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef } from "react"

import "@/styles/Wordz.css"
export default function Wordz() {
    const wordInterval = useRef<NodeJS.Timeout | undefined>()
    const currentWord = useRef(0)
    const words = useRef<HTMLElement[]>([])
    const wordArray = useRef<HTMLElement[][]>([])

    useEffect(() => {
        startWords()
        return () => {
            clearInterval(wordInterval.current)
        }
    }, [])

    const startWords = () => {
        words.current = Array.from(document.getElementsByClassName("word") as HTMLCollectionOf<HTMLElement>)
        currentWord.current = 0
        wordArray.current = []

        if (words.current.length === 0) {
            return
        }

        for (let i = 0; i < words.current.length; i++) {
            splitLetters(words.current[i])
        }

        changeWord()
        clearInterval(wordInterval.current)
        wordInterval.current = setInterval(changeWord, 4000)
    }

    const changeWord = () => {
        const cw = wordArray.current[currentWord.current]
        const nw = currentWord.current === words.current.length - 1 ? wordArray.current[0] : wordArray.current[currentWord.current + 1]

        for (let i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i)
        }

        for (let i = 0; i < nw.length; i++) {
            nw[i].className = "letter behind"
            nw[0].parentElement!.style.opacity = "1"
            animateLetterIn(nw, i)
        }

        currentWord.current = currentWord.current === wordArray.current.length - 1 ? 0 : currentWord.current + 1
    }

    const animateLetterOut = (cw: HTMLElement[], i: number) => {
        setTimeout(() => {
            cw[i].className = "letter out"
        }, i * 80)
    }

    const animateLetterIn = (nw: HTMLElement[], i: number) => {
        setTimeout(() => {
            nw[i].className = "letter in"
        }, 340 + i * 80)
    }

    const splitLetters = (word: HTMLElement) => {
        const content = word.innerText
        word.innerText = ""
        const letters: HTMLElement[] = []

        for (let i = 0; i < content.length; i++) {
            const letter = document.createElement("span")
            letter.className = "letter"
            letter.innerText = content.charAt(i)
            word.appendChild(letter)
            letters.push(letter)
        }

        wordArray.current.push(letters)
    }

    return (
        <div className="absolute -top-20 left-0">
            <div className="relative h-[100%] flex items-center">
                <div className="bannertxt text-[18rem] opacity-5">
                    <label>
                        <span className="word font-title">Mysteries</span>
                        <span className="word font-title">Challenges</span>
                        <span className="word font-title">Adventures</span>
                        <span className="word font-title">Discover</span>
                    </label>
                </div>
            </div>
        </div>
    )
}
