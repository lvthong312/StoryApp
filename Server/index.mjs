import express from 'express';
import 'dotenv/config'
import AxiosInstance, { axiosResponseConfig } from './src/axios/AxiosInstance.mjs'
import { ITEM_URL, getEndPoint } from './src/services/ApiUrl.mjs';
import { BEST_STORIES_CACHE_KEY, getStoryByIdCacheKey, NEW_STORIES_CACHE_KEY, TOP_STORIES_CACHE_KEY } from './src/constants/Constants.mjs'
import { preLoadJobStories } from './src/utils/SyncJob.mjs'
import NodeCache from 'node-cache'

const app = express();
const cache = new NodeCache();
axiosResponseConfig();
app.use(express.json());
app.get('/', (req, res) => {
    return res.send('Hello')
})

preLoadJobStories(cache, AxiosInstance, getEndPoint);

async function paginationStories(data, offset = 1, limit = 20) {
    const stories = data.slice((offset - 1) * limit, offset * limit);
    return stories
}

async function handlelCachedStory(req, res, next, keyCached) {
    const { offset, limit } = req.body
    const cachedStories = cache.get(keyCached);
    if (cachedStories) {
        const newStories = await paginationStories(cachedStories, offset, limit)
        return res.send({
            data: newStories,
        })
    }
    next()
}
app.post('/get-story-comments-by-id', async (req, res) => {
    const { offset, limit } = req.body
    const { id } = req.body;
    let keyCache = getStoryByIdCacheKey(id)
    const cachedData = await cache.get(keyCache);
    if (cachedData) {
        const comments = cachedData?.kids || []
        const newFormatStories = await paginationStories(comments, offset, limit)
        return res.send({
            data: newFormatStories
        });
    }
    const story = await AxiosInstance.get(process.env.BASE_URL + ITEM_URL(id))
    cache.set(keyCache, story);
    const comments = story?.kids || []
    const newFormatStories = await paginationStories(comments, offset, limit)
    return res.send({
        data: newFormatStories,
    })
})

app.post('/get-new-stories', (req, res, next) => handlelCachedStory(req, res, next, NEW_STORIES_CACHE_KEY), async (req, res) => {
    const { offset, limit } = req.body
    const newStories = await AxiosInstance.get(process.env.BASE_URL + getEndPoint('new'))
    const newFormatStories = await paginationStories(newStories, offset, limit)
    cache.set(NEW_STORIES_CACHE_KEY, newStories);
    return res.send({
        data: newFormatStories,
    })
})
app.post('/get-best-stories', (req, res, next) => handlelCachedStory(req, res, next, BEST_STORIES_CACHE_KEY), async (req, res) => {
    const { offset, limit } = req.body
    const bestStories = await AxiosInstance.get(process.env.BASE_URL + getEndPoint('best'))
    const newBestStories = await paginationStories(bestStories, offset, limit)
    cache.set(BEST_STORIES_CACHE_KEY, bestStories);
    return res.send({
        data: newBestStories,
    })
})
app.post('/get-top-stories', (req, res, next) => handlelCachedStory(req, res, next, TOP_STORIES_CACHE_KEY), async (req, res) => {
    const { offset, limit } = req.body
    const topStories = await AxiosInstance.get(process.env.BASE_URL + getEndPoint('top'))
    const newTopStories = await paginationStories(topStories, offset, limit)
    cache.set(TOP_STORIES_CACHE_KEY, topStories);
    return res.send({
        data: newTopStories,
    })
})

app.post('/get-story-by-id', async (req, res) => {
    const { id } = req.body;
    let keyCache = getStoryByIdCacheKey(id)
    const cachedData = cache.get(keyCache);
    if (cachedData) {
        return res.send(cachedData);
    }
    const story = await AxiosInstance.get(process.env.BASE_URL + ITEM_URL(id))
    cache.set(keyCache, story);
    return res.send(story);
})
app.listen(process.env.PORT, () => {
    console.log('Server started at: http://localhost:' + process.env.PORT);
})