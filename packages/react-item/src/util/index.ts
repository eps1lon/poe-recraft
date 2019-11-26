export function warn(message?: any, ...optionalParams: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    // display warnings in development environment
    console.warn(message, ...optionalParams);
  }
}
