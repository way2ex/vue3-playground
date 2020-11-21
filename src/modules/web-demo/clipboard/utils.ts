export function getBlobAsDataUrl (blob: Blob) {
    const reader = new FileReader()
    const promise = new Promise<string>((resolve, reject) => {
        reader.onload = (e) => {
            resolve(e.target.result as string)
        }
        reader.onerror = err => {
            reject(err)
        }
        reader.readAsDataURL(blob)
    })
    return promise
}