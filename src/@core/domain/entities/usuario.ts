export type UsuarioProps = {
    login: string;
    nome: string;
    id?: number;
  };
  
  export class Usuario {
    constructor(public props: UsuarioProps) {}
  
    get id() {
      return this.props.id;
    }
  
    get login() {
      return this.props.login;
    }
  
    get nome() {
      return this.props.nome;
    }
  
    toJSON(){
      return {
        id: this.id,
        login: this.login,
        nome: this.nome,
      }
    }
  }
  