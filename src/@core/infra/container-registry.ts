import "reflect-metadata";
import { Container } from "inversify";
import { http } from "./http";
import { UsuarioUseCase } from "../application/usuario/usuario.use-case"; 
import { UsuarioHttpGateway } from "./gateways/usuario-http.gateway";

export const Registry = {
    AxiosAdapter: Symbol.for("AxiosAdapter"),

    UsuarioGateway: Symbol.for("UsuarioGateway"),    

    UsuarioUseCase: Symbol.for("UsuarioUseCase"),
}

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http);

//########## GATEWAYS
container.bind(Registry.UsuarioGateway).toDynamicValue((context) => {
    return new UsuarioHttpGateway(context.container.get(Registry.AxiosAdapter));
});

//########## USE CASES
container.bind(Registry.UsuarioUseCase).toDynamicValue((context) => {
    return new UsuarioUseCase(
      context.container.get(Registry.UsuarioGateway)
    );
  });

