const APIurl = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCxuYPUdTZHRZKVRZ1km1plw&part=snippet%2Cid&order=date&maxResults=50'
const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd397dd2ed8msh8841ccb95a3bdc4p1cea97jsn92c4b3b71749',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

fetch(APIurl, options)
	.then(response => response.json())
	.then(response => console.log(response.json))
	.catch(err => console.error(err));

async function fetchData(APIurl) {
    const response = await fetch(APIurl, options);
    const data = await response.json();
    return data;
};

(async () => {
    try {
        const videos = await fetchData(APIurl);
    let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).slice(0,4).join('')}

    `; 
    // console.log(view);
    content.innerHTML = view;
    } catch(error) {
        //content.innerHTML = `<p>Error: ${error}</p>`
        console.log(error);
    }
})();