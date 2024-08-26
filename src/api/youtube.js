

export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword, pageToken = '') {
        return keyword ? this.#searchByKeyword(keyword, pageToken) : this.#mostPopular(pageToken);
    }

    async channelImageURL(id) {
        return this.apiClient.channels({ params: { part: 'snippet', id } })
            .then(res => res.data.items[0].snippet.thumbnails.default.url);
    }

    async relatedVideos(videoId, pageToken = '') {
        return this.apiClient.commentThreads({
            params: {
                part: 'snippet,replies',
                videoId: videoId,
                maxResults: 25,
                pageToken
            }
        })
        .then((res) => ({
            items: res.data.items.map((item) => ({ id: item.id, snippet: item.snippet.topLevelComment.snippet })),
            nextPageToken: res.data.nextPageToken,
        }));
    
    }
    async shortsVideos(pageToken = '') {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                q: 'shorts',
                type: 'video',
                videoDuration:'short',
                pageToken
            }
        })
        .then((res) => ({
            items: res.data.items.map((item) => ({ id: item.id, snippet: item.snippet })),
            nextPageToken: res.data.nextPageToken,
        }));
    }

    async channelRelatedVideos(channelId) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                channelId: channelId,
                order: 'date',
            }
        })
        .then((res) => res.data.items.map((item) => ({ ...item, id: item.id.videoId })));
    }

    async #searchByKeyword(keyword, pageToken) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                q: keyword,
                pageToken,
            }
        })
        .then((res) => ({
            items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
            nextPageToken: res.data.nextPageToken,
        }));
    }

    async #mostPopular(pageToken) {
        return this.apiClient.videos({
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: 'mostPopular',
                pageToken,
            }
        })
        .then((res) => ({
            items: res.data.items,
            nextPageToken: res.data.nextPageToken,
        }));
    }
}