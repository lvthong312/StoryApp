export const getEndPoint = type => {
    const obj = {
        'new': 'newstories',
        'past': '',
        'comments': 'user',
        'ask': 'askstories',
        'show': 'showstories',
        'jobs': 'jobstories',
        'top': 'topstories',
        'best': 'beststories',
        'user': 'user'
    }
    let endpoint = obj[type] ? obj[type]: obj['new']
    return `/${endpoint}.json?print=pretty`;
}
export const ITEM_URL = (id) => (`/item/${id}.json?print=pretty`)