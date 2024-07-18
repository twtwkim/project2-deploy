import React, { useRef, useEffect, useState } from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MoonLoader } from 'react-spinners';
import Slider from 'react-slick';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // 아이콘 임포트
import { SiYoutubeshorts } from "react-icons/si";
import YouTube from 'react-youtube'; // react-youtube 라이브러리 임포트
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/custom-slick.css';

const Shorts = () => {
    const { youtube } = useYoutubeApi();
    const fetchShorts = ({ pageParam = '' }) => youtube.shortsVideos(pageParam);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ['shorts'],
        queryFn: fetchShorts,
        getNextPageParam: (lastPage) => lastPage.nextPageToken ?? false,
    });

    const sliderRef = useRef(null);
    const [player, setPlayer] = useState(null); 

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        prevArrow: <FaChevronUp className="slick-arrow slick-prev" />,
        nextArrow: <FaChevronDown className="slick-arrow slick-next" />,
    };

    useEffect(() => {
        const handleScroll = (event) => {
            if (event.deltaY < 0) {
                sliderRef.current.slickPrev();
            } else if (event.deltaY > 0) {
                sliderRef.current.slickNext();
            }
        };

        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const onReady = (event) => {
        setPlayer(event.target);
    };

    const onSlideChange = () => {
        if (player) {
            player.pauseVideo(); 
        }
    };

    const afterChange = (index) => {
        if (player) {
            player.playVideo(); 
        }
    };

    return (
        <>
            <div className='flex justify-center items-center m-6'>
                <SiYoutubeshorts className='mr-2 text-brand text-2xl'/><p className='text-2xl font-bold'>Shorts</p>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-2/3 max-w-5xl lg:w-full rounded-xl shadow-2xl'>
                    <Slider ref={sliderRef} {...settings} beforeChange={onSlideChange} afterChange={afterChange}>
                        {data?.pages.map((page, pageIndex) =>
                            page.items.map((short) => (
                                <div key={short.id.videoId} className="relative">
                                    <h3 className="text-lg font-bold mb-2 text-wrap">{short.snippet.title}</h3>
                                    <YouTube
                                        videoId={short.id.videoId}
                                        opts={{
                                            width: '100%',
                                            height: 600,
                                            playerVars: {
                                                autoplay: 1, 
                                            },
                                        }}
                                        onReady={onReady}
                                    />
                                </div>
                            ))
                        )}
                    </Slider>
                </div>
                {isFetchingNextPage && (
                    <div className="flex justify-center items-center h-24">
                        <MoonLoader size={30} color="#21f4bb" />
                    </div>
                )}
                {!hasNextPage && <p>No more shorts to load</p>}
            </div>
        </>
    );
};

export default Shorts;