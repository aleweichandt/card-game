const logger = (group: string) => (...data: any[]) => console.log(group, ...data)

export default logger
