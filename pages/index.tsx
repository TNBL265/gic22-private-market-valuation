import {useEffect, useState} from 'react'

export default function Home() {
    const [instruments, setInstruments] = useState({"instruments": []});

    useEffect(() => {
        fetch('/instruments/')
            .then(res => res.json())
            .then(data => {
                setInstruments(data);
            })
    }, [])

    return (
        <div>
            {instruments.instruments.map((instrument, i) => (
                <p key={i}>{instrument}</p>
            ))}
        </div>
    )
}
