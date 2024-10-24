

export default function Login(){


    return (
        <div class="container mt-5">
        <h2>Acesse sua Conta</h2>

        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Digite seu email"></input>
        </div>

        <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" placeholder="Digite sua senha"></input>
        </div>

        <button type="button" class="btn btn-primary" onclick="handleSubmit()">Login</button>
        </div>
    )

}