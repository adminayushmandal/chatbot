export type PromptObj = {
    userPrompt: string
    environment: 'General' | 'SqlServer_Live' | 'Windows_Live'
    servers: string
}