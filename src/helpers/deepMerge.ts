export function isObject(thing: any): thing is object {
    return typeof thing === "object" ? true : false
}

export function deepMerge<T>(target: T, source: T) {
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            // tell TypeScript that the key is a key and not a string
            const typedKey = key as keyof Object
            if (source.hasOwnProperty(key)) {
                if (isObject(source[typedKey])) {
                    // recursive merge
                    if (!target[typedKey]) Object.assign(target, { [key]: {} })
                    deepMerge(target[typedKey], source[typedKey])
                } else {
                    Object.assign(target, { [key]: source[typedKey] })
                }
            }
        }
        return target
    } else {
        throw new Error("Deep merge error.")
    }
}