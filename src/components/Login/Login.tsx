export function Login() {
  return (
    <div className="container">
      <form>
        <h1>Acesse o sistema</h1>
        <div>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="Senha" />
        </div>
        <button>Entrar</button>
      </form>
    </div>
  );
}
