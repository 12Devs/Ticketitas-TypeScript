class ApiError {

    public readonly message: string;
    public readonly statusCode: number;

    constructor (message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

const resolver = (handlerFn: any) => {
    return (req: any, res: any, next: any) => {
      return Promise.resolve(handlerFn(req, res, next))
        .catch(e => next(e));
    }
  }

export { ApiError, resolver };