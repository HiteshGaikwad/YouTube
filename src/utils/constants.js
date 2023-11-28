const API_ACCESS_KEY="AIzaSyCtrC8zj10Qm5hIAxo5boFEuaVHWlpq4xo";

// const CORS_PROXY_URL="https://corsproxy.io/?";

// ${CORS_PROXY_URL}

export const YOUTUBE_VIDEO_API= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_ACCESS_KEY}`;

export const YOUTUBE_CHANNEL_LOGO_URL= `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=${API_ACCESS_KEY}&id=`;

export const YOUTUBE_SEARCH_SUGGESTION_API= `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`;

export const YOUTUBE_VIDEOS_SEARCH_API= `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=${API_ACCESS_KEY}&q=`;

export const YOUTUBE_COMMENTS_API= `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet,replies&maxResults=100&key=${API_ACCESS_KEY}&videoId=`;

export const LIVE_CHAT_OFFSET=50;   

export const BUTTONS= ["Popular","Music","Live","BollywoodMusic","HollywoodMusic","Gaming","Movies","Sports","ViratKohli", "Gadges","RecentlyUploaded","Watched","ComputerProgramming","BollywoodMovies","HollywoodMovies","MarathiMovies","TableTennis","Cricket","Football","loFi"];