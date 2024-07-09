export interface IStory {
    id?: number
    by?: string
    text?: string
    descendants?: number
    kids?: Array<number>
    score?: number
    time?: number
    title?: string
    type?: string
    url?: string
}

export interface IStoryScroll {
    data: Array<number>, 
    isRefreshing: boolean, 
    onRefresh: Function, 
    onEndReached: Function, 
    isFetchingNextPage: boolean
}