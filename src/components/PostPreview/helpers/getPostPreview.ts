function getPostPreview(content: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const uls = doc.querySelectorAll("ul")
    uls.forEach(ul => { ul.remove() })
    const firstP = doc.querySelector("p")
    return firstP
}

export default getPostPreview