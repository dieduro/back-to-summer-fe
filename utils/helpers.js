
export  const matrixMapping = (index) => {
    if (index < 3) {
        return [0, index ]
    } else if (index >= 3 && index < 6) {
        return [1, index - 3]
    } else if (index >= 6 && index < 9) {
        return [2, index - 6]
    } 
  }