import { BEST_STORIES_CACHE_KEY, NEW_STORIES_CACHE_KEY, TOP_STORIES_CACHE_KEY } from "../constants/Constants.mjs";

var syncNewStoriesJobId = 0
var syncBestStoriesJobId = 0
var syncTopStoriesJobId = 0

function newStoriesJob(cache, AxiosInstance, getEndPoint) {
    if (syncNewStoriesJobId) clearInterval(syncNewStoriesJobId)
    syncNewStoriesJobId = setInterval(async () => {
        const newStories = await AxiosInstance.get(process.env.BASE_URL + getEndPoint('new'))
        cache.set(NEW_STORIES_CACHE_KEY, newStories);
    }, 2 * 60 * 1000);
}
function bestStoriesJob(cache, AxiosInstance, getEndPoint) {
    if (syncBestStoriesJobId) clearInterval(syncBestStoriesJobId)
    syncBestStoriesJobId = setInterval(async () => {
        const bestStories = await AxiosInstance.get(process.env.BASE_URL + getEndPoint('best'))
        cache.set(BEST_STORIES_CACHE_KEY, bestStories);
    }, 2 * 60 * 1000);
}
function topStoriesJob(cache, AxiosInstance, getEndPoint) {
    if (syncTopStoriesJobId) clearInterval(syncTopStoriesJobId)
    syncTopStoriesJobId = setInterval(async () => {
        const topStories = await AxiosInstance.get(process.env.BASE_URL + getEndPoint('top'))
        cache.set(TOP_STORIES_CACHE_KEY, topStories);
    }, 2 * 60 * 1000);
}

export async function preLoadJobStories(cache, AxiosInstance, getEndPoint) {
    newStoriesJob(cache, AxiosInstance, getEndPoint)
    bestStoriesJob(cache, AxiosInstance, getEndPoint)
    topStoriesJob(cache, AxiosInstance, getEndPoint)
}