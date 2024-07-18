import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import ChannelVideos from '../components/ChannelVideos';

const VideoDetail = () => {
    const { state: { video } } = useLocation();
    const { title, channelId, channelTitle, description } = video.snippet;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    return (
        <section className='flex flex-col lg:flex-row'>
            <section className='basis-4/6 max-w-5xl'>
                <article>
                    <iframe
                        id="player"
                        type="text/html"
                        width="100%"
                        height="640"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        frameBorder="0"
                        title={title}
                    />
                    <div className='py-8' >
                        <h2 className='text-xl font-bold'>{title}</h2>
                        <ChannelInfo id={channelId} name={channelTitle} /> 
                        <pre className={`whitespace-pre-wrap bg-gray-950 text-gray-300 p-6 rounded-lg shadow ${showFullDescription ? '' : 'line-clamp-3'}`}>
                            {description}
                        </pre>
                        <button
                            onClick={toggleDescription}
                            className="mt-2 ml-2 text-black hover:underline"
                        >
                            {showFullDescription ? '간략히' : '더보기'}
                        </button>
                    </div>
                </article>
                <section>
                    <RelatedVideos id={video.id} />
                </section>
            </section>
            <section className='basis-2/6'>
                <ChannelVideos id={channelId} />
            </section>
        </section>
    );
};

export default VideoDetail;