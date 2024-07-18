import React, { forwardRef } from 'react';
import { formatAgo } from '../util/date';

const VideoReply = forwardRef(({ video, type }, ref) => {
    const { authorProfileImageUrl, authorDisplayName, textOriginal, publishedAt } = video.snippet;
    const isList = type === 'list';
    return (
        <li ref={ref} className={isList ? 'flex gap-1 m-2 items-center' : ''}>
            <img className={isList ? 'w-15 h-12 mr-2 rounded-full' : 'w-full rounded-full'} src={authorProfileImageUrl} alt={authorDisplayName} />
            <div>
                <p className='font-semibold my-2 line-clamp-2'>{authorDisplayName}</p>
                <p className='text-sm opacity-80'>{textOriginal}</p>
                <p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
            </div>
        </li>
    );
});

export default VideoReply;