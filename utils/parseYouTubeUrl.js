const getYouTubeId = (url) => {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
  }

const BASE_URL = "https://www.youtube.com/embed/"

export const parseYouTubeUrl = (questions) => {
    questions.map(question => {
        if (question.type == 'video') {
            question.youtubeId = getYouTubeId(question.video.url)
            let queryParams = ''
            queryParams = question.video.start && `?start=${question.video.start}`
            queryParams = question.video.end && `${queryParams}&end=${question.video.end}`
            question.video.url =`${BASE_URL}${question.youtubeId}${queryParams}`
            console.log(9090,queryParams)
            console.log(9091,question.video.url)
        }
    })
    return questions

}