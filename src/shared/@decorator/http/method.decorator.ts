import { RouteDefinition } from "../../model/routeDefinition";

export function Get(path: string) {
  return _routerBind("get", path);
}

export function Post(path: string) {
  return _routerBind("post", path);
}

export function Delete(path: string) {
  return _routerBind("delete", path);
}

export function Put(path: string) {
  return _routerBind("put", path);
}

export function Patch(path: string) {
  return _routerBind("patch", path);
}

const _routerBind = (method: RouteDefinition["method"], path: string) => {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }
    const routes = Reflect.getMetadata(
      "routes",
      target.constructor
    ) as Array<RouteDefinition>;
    routes.push({
      method,
      path,
      methodName: propertyKey,
    });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};
