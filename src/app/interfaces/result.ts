export interface referencesType {
    id: string,
    snippet: string,
    url: string,
    title: string
}

export interface summaryType {
    origin: string | null,
    analyse: string[][],
    propose: string[][]
}