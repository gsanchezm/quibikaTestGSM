function LoggerDecorator(pageObject) {
    return new Proxy(pageObject, {
        get(target, property) {
            const originalMethod = target[property];
            if (typeof originalMethod === 'function') {
                return async (...args) => {
                    console.log(`Calling ${property} with arguments: ${JSON.stringify(args)}`);
                    const result = await originalMethod.apply(target, args);
                    console.log(`Completed ${property}`);
                    return result instanceof Promise ? result : target;  // Support for fluent interface
                };
            }
            return originalMethod;
        }
    });
}

module.exports = LoggerDecorator;