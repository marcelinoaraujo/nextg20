import { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { Usuario,UsuarioProps } from "../../domain/entities/usuario";
import { UsuarioGateway } from "../../domain/gateways/usuario.geteway";
import { ResultHttp } from "./http.gateway";

export class UsuarioHttpGateway implements UsuarioGateway {
  constructor(private http: AxiosInstance) {}

  async create(usuario: Usuario): Promise<Usuario> {
    return this.http.post<ResultHttp<UsuarioProps>>(`/usuarios`,usuario).then((res) => {
      return new Usuario(res.data.data!);
    });
  }

  async update(usuario: Usuario): Promise<Usuario> {
    console.log(usuario);
    return this.http.patch<ResultHttp<UsuarioProps>>(`/usuarios/${usuario.id}`,usuario).then((res) => {
      return new Usuario(res.data.data!);
    });
  }

  async findAll(): Promise<Usuario[]> {
    return this.http.get<ResultHttp<UsuarioProps[]>>("/usuarios").then((res) => 
       res.data.data!.map(function(data): Usuario {
         return new Usuario(data);
       }  
    ));
  }

  async findById(id: number): Promise<Usuario> {
    return this.http.get<ResultHttp<UsuarioProps>>(`/usuarios/${id}`).then((res) => {
      return new Usuario(res.data.data!);
    });
  }

  async findByName(name: string): Promise<Usuario> {
    return this.http.get<ResultHttp<UsuarioProps>>(`/usuarios/${name}`).then((res) => {
      return new Usuario(res.data.data!);
    });
  }

  async validaLogin(plogin: string, psenha: string): Promise<boolean> {
    return this.http.post<ResultHttp<{loginValid:boolean}>>(`/usuarios/validaLogin/${plogin}`,{senha: psenha}).then((res) => {
      return res.data.data!.loginValid;
    });
  }
}
