export default {
    getVideoIdentificador: (link) => {
        const linkInfo = 
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/gim
        .exec(link)

        if (linkInfo) {
            return linkInfo[6]
        }
        return false
    }
}