import { Usuario } from "../../domain/entities/usuario";
import { UsuarioGateway } from "../../domain/gateways/usuario.geteway"; 
export class UsuarioUseCase {
  constructor(private usuarioGate: UsuarioGateway) {}

  async list(): Promise<Usuario[]> {
    return await this.usuarioGate.findAll();
  }

  async post(usuario: Usuario): Promise<Usuario> {
    return await this.usuarioGate.create(usuario);
  }  

  async get(id: number): Promise<Usuario> {
    return await this.usuarioGate.findById(id);
  }  

  async getByName(name: string): Promise<Usuario> {
    return this.usuarioGate.findByName(name);
  }  

}
