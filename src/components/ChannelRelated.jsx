import React from 'react';
import { formatAgo } from '../util/date';
import { useNavigate } from 'react-router-dom';

const ChannelRelated = ({video, type}) => {
    const {title, thumbnails, channelTitle, publishedAt, channelId} = video.snippet;
    const videoId = video.id;
    const navigate = useNavigate();
    const isList = type ==='list'
    return (
        <li 
            className={isList ? 'flex gap-1 m-2' : ''}
            onClick={()=>{navigate(`/videos/watch/${channelId}`, {state: {video}})}}>
            <img className={isList ? 'max-h-40 min-w-60 w-60 mr-2 rounded-lg' : 'w-full rounded-lg'} src={thumbnails.medium.url} alt={title} />
            <div>
                <p className='font-semibold my-2 line-clamp-2'>{title}</p>
                <p className='text-sm opacity-80'>{channelTitle}</p>
                <p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
            </div>
        </li>
    );
};

export default ChannelRelated;