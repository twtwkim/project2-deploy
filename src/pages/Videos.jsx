import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { MoonLoader } from 'react-spinners';

const Videos = () => {
    const { keyword } = useParams();
    const { youtube } = useYoutubeApi();
    const observer = useRef();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error
    } = useInfiniteQuery({
        queryKey: ['videos', keyword],
        queryFn: ({ pageParam = '' }) => youtube.search(keyword, pageParam),
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

    const lastVideoElementRef = useCallback(
        (node) => {
            if (isLoading || isFetchingNextPage) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
    );

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong</p>}
            {data && (
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
                    {data.pages.map((page, pageIndex) => (
                        page.items.map((video, videoIndex) => {
                            if (pageIndex === data.pages.length - 1 && videoIndex === page.items.length - 1) {
                                return <VideoCard ref={lastVideoElementRef} key={video.id} video={video} />;
                            } else {
                                return <VideoCard key={video.id} video={video} />;
                            }
                        })
                    ))}
                </ul>
            )}
            {isFetchingNextPage && <p className='flex justify-center items-center h-24'><MoonLoader size={30} color='#21f4bb'/></p>}
        </>
    );
};

export default Videos;