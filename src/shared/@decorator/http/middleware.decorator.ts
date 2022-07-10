import { Request, Response, NextFunction } from "express";

export const Middleware = (middlewareFn: Function): ClassDecorator => {
  return (target: any) => {
    console.log("test");
  };
};

export function RequestLog(): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(args);
      let request = args[0] as Request;

      const { url, method, body, headers } = request;

      console.log("[LOG]", {
        url,
        method,
        body,
        headers,
      });
      return original.apply(this, args);
    };
  };
}

export function Auth(token: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const request = args[0] as Request;
      const response = args[1] as Response;

      const headers = request.headers;

      if (headers.authorization === `Bearer ${token}`) {
        return original.apply(this, args);
      }
      response.status(403).json({ error: "Not Authorized" });
    };
  };
}
