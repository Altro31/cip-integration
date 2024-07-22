
export function ToDataFactory(separator: string = ':') {
    return (input: any, c?: string) => Object.entries(input).reduce((prev, entry) => {
        //Aplica la funcion correspondiente en dependencia del tipo de dato que se pase
        const mapper = generateMapper(separator, c)
        let str = ''
        const value = entry[1]
        str = mapper.get(typeof value)(entry)
        if (prev && str) str = `, ${str}`
        return str ? `${prev}${str}` : prev
    }, '')

}

function generateMapper(separator: string, c: string) {

    const toString = generateToStringFunction(separator)

    const v = c ? `${c}.` : ''
    return new Map<string, (entry: [string, any]) => string>([
        ['undefined', (_: any) => ''],
        ['number', ([key, value]) => `${v}${key}${separator} ${value}`],
        ['boolean', ([key, value]) => `${v}${key}${separator} ${value}`],
        ['string', ([key, value]) => `${v}${key}${separator} "${<string>value}"`],
        ['object', (entry) => toString(entry)],
    ])
}

function generateToStringFunction(separator: string) {
    return ([key, value]: [string, any]) => {
        let str = `${key}${separator} `
        if (value instanceof Date)
            str += `"${value.toString()}"`
        if (value instanceof Array) {
            value = value.map(value => typeof value === 'string' ? `"${value}"` : value)
            str += `[${value.toString()}]`
        }
        return str
    }
}

