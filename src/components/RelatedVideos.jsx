import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoReply from './VideoReply';
import { MoonLoader } from 'react-spinners';

const RelatedVideos = ({ id }) => {
    const { youtube } = useYoutubeApi();
    const observer = useRef();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
        queryKey: ['related', id],
        queryFn: ({ pageParam = '' }) => youtube.relatedVideos(id, pageParam),
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

    const lastCommentElementRef = useCallback((node) => {
        if (isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'error') return <p>Error: {error.message}</p>;

    return (
        <div className='bg-gray-950 text-gray-300 rounded-lg shadow'>
            {data?.pages?.map((page, pageIndex) => (
                <React.Fragment key={pageIndex} >
                    {page.items.map((comment, commentIndex) => {
                        if (pageIndex === data.pages.length - 1 && commentIndex === page.items.length - 1) {
                            return <VideoReply ref={lastCommentElementRef} key={comment.id} video={comment} type='list' />;
                        } else {
                            return <VideoReply key={comment.id} video={comment} type='list' />;
                        }
                    })}
                </React.Fragment>
            ))}
            {isFetchingNextPage && <p className='flex justify-center items-center h-24'><MoonLoader size={30} color='#21f4bb'/></p>}
        </div>
    );
};

export default RelatedVideos;