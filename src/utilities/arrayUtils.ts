const sample = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
}

const sampleIndex = <T>(array: T[]): number => {
    return Math.floor(Math.random() * array.length)
}

export { sample, sampleIndex }