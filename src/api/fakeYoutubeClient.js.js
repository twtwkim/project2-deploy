import axios from "axios";

export default class FakeYoutubeClient {
    async search({params}) {
        return params.channelRelatedVideos
            ? axios.get('/videos/related.json')
            : axios.get('/videos/search.json')
    }
    // async search() {
    //     return axios.get('/videos/search.json')
    // }
    async videos() {
        return axios.get('/videos/popular.json')
    }
    async channels() {
        return axios.get('/videos/channel.json')
    }
    async commentThreads() {
        return axios.get('/videos/reply.json')
    }
    async shortThreads(){
        return axios.get('/videos/shorts.json')
    }
}