import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import ChannelRelated from './ChannelRelated';
import { useQuery } from '@tanstack/react-query';
import { PiVideoLight } from "react-icons/pi";

const ChannelVideos = ({id}) => {
    const { youtube } = useYoutubeApi();
    const { error, isLoading, data: videos  } = useQuery({
        queryKey: ['channelRelated', id],
        queryFn: () => youtube.channelRelatedVideos(id)
    });
    // console.log(id)
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong</p>}
            {videos && (
                <ul className={'whitespace-pre-wrap bg-gray-950 text-gray-300 p-2 rounded-lg shadow ml-2'}>
                    <div className='flex items-center'><PiVideoLight className='mr-2' color='#21f4bb'/><p>채널의 다른 영상</p></div>
                    {videos.map((video) => 
                        <ChannelRelated key={video.id} video={video} type='list' />
                    )}
                </ul>
            )}
        </>
    );
};

export default ChannelVideos;