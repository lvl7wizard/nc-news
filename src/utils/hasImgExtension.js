function hasImgExtension(string) {
    return(string.match(/\.(jpeg|jpg|png)$/) != null);
}

export default hasImgExtension;