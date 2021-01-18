/**
 * Does not copy complex objects such as Date, functions etc.
 */
const deepCopy = <T extends Object>(object: T) => JSON.parse(JSON.stringify(object)) as T;

export default deepCopy;
