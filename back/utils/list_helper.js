const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (array) => {
    const mapped = array.map(blog => blog.likes)
    const reducer = (a,b) => {
        return a + b
    }
    return mapped.reduce(reducer, 0)
}

const favouriteBlog = (array) => {
    if (array.length === 0) {
        return {}
    }
    const mapped = array.map(blog => blog.likes)
    const index = mapped.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    const mapped1 = array.map(({title, author, likes}) => ({title, author, likes}))
    return mapped1[index]
    
}

module.exports = {
    dummy, totalLikes, favouriteBlog
  }