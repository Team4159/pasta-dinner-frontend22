const detectMobile = ():boolean => {
    const platforms:RegExp[] = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]
    console.log(platforms.some(platform => navigator.userAgent.match(platform)))
    return platforms.some(platform => navigator.userAgent.match(platform))
}
export default detectMobile