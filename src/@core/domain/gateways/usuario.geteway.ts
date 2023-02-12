import { Usuario } from "../entities/usuario";

export interface UsuarioGateway{
    findAll(): Promise<Usuario[]>;
    findById(id: number): Promise<Usuario>;
    findByName(nome: string): Promise<Usuario>;
    create(usuario:Usuario): Promise<Usuario>;
    validaLogin(login: string, senha: string): Promise<boolean> ;
}