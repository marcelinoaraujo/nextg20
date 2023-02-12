import { AxiosInstance } from "axios";
import { plainToInstance } from "class-transformer";
import { Usuario,UsuarioProps } from "../../domain/entities/usuario";
import { UsuarioGateway } from "../../domain/gateways/usuario.geteway";

export class UsuarioHttpGateway implements UsuarioGateway {
  constructor(private http: AxiosInstance) {}

  async create(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>("/usuarios",usuario).then((res) => {
      return new Usuario(res.data);
    });
  }

  async findAll(): Promise<Usuario[]> {
    return this.http.get<Usuario[]>("/usuarios").then((res) => 
       res.data.map(function(data): Usuario {
         return new Usuario(data);
       }  
    ));
  }

  async findById(id: number): Promise<Usuario> {
    return this.http.get<Usuario>(`/usuarios/${id}`).then((res) => {
      return new Usuario(res.data);
    });
  }

  async findByName(name: string): Promise<Usuario> {
    return this.http.get<Usuario>(`/usuarios/${name}`).then((res) => {
      return new Usuario(res.data);
    });
  }

  async validaLogin(plogin: string, psenha: string): Promise<boolean> {
    return this.http.post<{loginValid:boolean}>(`/usuarios/validaLogin/${plogin}`,{senha: psenha}).then((res) => {
      return res.data.loginValid;
    });
  }
}
