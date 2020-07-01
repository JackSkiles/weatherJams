export const CHANGE_WEATHER = "CHANGE_WEATHER";
// export const PLAYLIST = "PLAYLIST";

export const changeWeather = (data) => {
    return {
        type: CHANGE_WEATHER,
        data
    }
}
// export const getPlaylist = (data) => {
//     return {
//         type: PLAYLIST,
//         data
//     }
// }
