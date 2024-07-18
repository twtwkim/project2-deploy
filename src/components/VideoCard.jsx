import React, { forwardRef } from 'react';
import { formatAgo } from '../util/date';
import { useNavigate } from 'react-router-dom';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

const VideoCard = forwardRef(({ video, type }, ref) => {
    const { title, thumbnails, channelTitle, publishedAt, channelId } = video.snippet;
    const navigate = useNavigate();
    const isList = type === 'list';
    const { youtube } = useYoutubeApi();
    const { data: url } = useQuery({
        queryKey: ['channel', channelId],
        queryFn: () => youtube.channelImageURL(channelId)
    });

    return (
        <li 
            ref={ref}
            className={isList ? 'flex gap-1 m-2' : ''}
            onClick={() => { navigate(`/videos/watch/${video.id}`, { state: { video } }) }}>
            <img className={isList ? 'w-60 mr-2 rounded-lg' : 'w-full rounded-lg'} src={thumbnails.medium.url} alt={title} />
            <div>
                <div className='flex my-4 mb-2 items-center'>
                    {url && <img className='w-10 h-10 rounded-full mr-3' src={url} alt={url} />}
                    <div>
                        <p className='text-sm opacity-80 mb-1'>{channelTitle}</p>
                        <p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
                    </div>
                </div>
                <p className='font-semibold my-2 line-clamp-2'>{title}</p>
            </div>
        </li>
    );
});

export default VideoCard;