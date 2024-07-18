import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch, BsFillMicFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import UseSpeechToText from './UseSpeechToText';

const Search = () => {
    const { keyword } = useParams();
    const [text, setText] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/videos/${text}`);
    }

    useEffect(() => {
        setText(keyword || ''); // 키워드가 없다면 기본값은 빈 문자열로!
    }, [keyword]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { transcript, listening, toggleListening } = UseSpeechToText();

    useEffect(() => {
        if (transcript) {
            setText(transcript);
        }
    }, [transcript]);

    return (
        <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4'>
            <button className='px-6 rounded-full' onClick={toggleMenu}>
                <IoIosMenu />
            </button>
            <Link to='/' className='flex items-center'>
                <BsYoutube className='text-4xl text-brand' />
                <h1 className='font-bold ml-2 text-3xl'>YouTube</h1>
            </Link>
            <div className={`menu-bar fixed top-0 left-0 h-full bg-zinc-600 text-gray-100 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-50 opacity-90`}>
                <nav className='pt-4'>
                    <ul className='flex flex-col'>
                        <li className='flex justify-end pr-4'>
                            <RiCloseLine className='cursor-pointer' onClick={toggleMenu} />
                        </li>
                        <li className='mt-3'><Link to="/" onClick={toggleMenu} className='flex items-center py-3 px-4 hover:text-white hover:bg-gray-800 text-sm'><BsYoutube className='mr-4' />홈</Link></li>
                        <li><Link to="/shorts" onClick={toggleMenu} className='flex items-center py-3 px-4 hover:text-white hover:bg-gray-800 text-sm'><SiYoutubeshorts className='mr-4' />Shorts</Link></li>
                    </ul>
                </nav>
            </div>
            <form className='w-full flex justify-center' onSubmit={handleSubmit}>
                <input 
                    className='w-7/12 p-2 outline-none bg-gray-100 text-black rounded-l-full' 
                    type='text' 
                    value={text} 
                    placeholder=' 검색어를 입력하세요' 
                    onChange={(e) => setText(e.target.value)} 
                />
                <button className='bg-zinc-200 px-4 rounded-r-full'>
                    <BsSearch />
                </button>
                <button className='px-4 rounded-full flex items-center' type="button" onClick={toggleListening}>
                    <BsFillMicFill className='mr-2' />
                    {listening && <span className='text-sm font-bold animate-blink'>음성인식 중지</span>}
                </button>
            </form>
        </header>
    );
};

export default Search;