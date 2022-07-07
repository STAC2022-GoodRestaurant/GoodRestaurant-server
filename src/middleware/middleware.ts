import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { HttpResponse } from "../shared/response/response";
import { Role, UserEntity } from "../user/entity/user.entity";

export class Middleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  passAuth(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate("jwt", { session: false });
  }
  checkCustomerRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== Role.CUSTOMER) {
      return this.httpResponse.Unauthorized(res, "No tienes permiso");
    }
    return next();
  }
  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (user.role !== Role.OWNER) {
      return this.httpResponse.Unauthorized(res, "No tienes permiso");
    }
    return next();
  }
}
