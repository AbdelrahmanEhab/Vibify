'use client';
import { useState, useEffect } from 'react';
import { SkipForward, Play } from "lucide-react";
import Table from './Table';

interface Song {
    name: string;
    artist: string;
    album: string;
    url: string;
    artistPhotoUrl: string;
}

interface MusicResponse {
    emojis: string[];
    songs: Song[];
}


const emojiPattern = /[\p{Emoji}\u200B-\u200D\uFE0F]/gu;

const Search : React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [songs, setSongs] = useState<Song[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const validateEmojiInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!/^[\p{Emoji}\u200B-\u200D\uFE0F]*$/gu.test(value)) {

            const validValue = value
            .split('')
            .filter((char) => emojiPattern.test(char))
            .join('');
            setInputValue(validValue);
        } else {
            setInputValue(value);
        }
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/api/music?emojis=${inputValue}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const musicData: MusicResponse = await response.json();
            setSongs(musicData.songs);
        } catch (error) {
            console.error("Error fetching music data:", error);
        }
        setLoading(false)
        console.log(songs)
    }

    useEffect(() => {
        console.log(songs);
        console.log(inputValue);
        console.log(`http://localhost:5000/api/music?emojis=${inputValue}`)
    }, [songs, inputValue]);


    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <div className="h-full w-full max-w-[1240px] flex flex-col items-center justify-start text-white py-10 gap-10">
                    <h1 className="text-xl">How Are You Feeling?</h1>
                    <form className="w-[80%]" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            className="px-5 py-3 bg-white rounded-4xl w-full text-black" 
                            placeholder="Only Type Emojis : 😀 😁 😂 🤣"
                            value={inputValue}
                            onChange={validateEmojiInput}
                        />
                        <div className='mt-10'>
                            <span className="bg-white h-[2px] w-[80%] my-5"></span>  
                            <div className="flex items-center justify-center md:gap-15 gap-10">
                            <button type='submit' disabled={!songs || songs.length === 0 || !inputValue} className={songs.length > 0 ? 'hover:scale-110 cursor-pointer' : ''}>
                                    <SkipForward size={30} className='rotate-180'/>
                                </button>
                                <button 
                                    className="bg-green text-background scale-110 lg:p-3 p-2 rounded-4xl hover:scale-120 cursor-pointer duration-150"
                                    type='submit'
                                    disabled={!inputValue}
                                >
                                    {!loading ? <Play size={30} className='ms-[2px]'/> : <p></p>}
                                </button>
                                <button type='submit' disabled={!songs || songs.length === 0 || !inputValue} className={songs.length > 0 ? 'hover:scale-110 cursor-pointer' : ''}>
                                    <SkipForward size={30}/>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='mx-5'>
                        {songs.length !== 0 && songs && <Table songs={songs}/>}
                    </div>
                </div>
            </div>
        </>
    )
} 

export default Search