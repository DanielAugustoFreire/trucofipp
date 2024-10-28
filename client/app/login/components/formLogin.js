import { useRef } from "react"

export default function FormLogin( ){
  
  let objUsuario = {
    email: "",
    senha: ""
  }

  function Login(){
    if(!(emailRef.current.value === "" || senhaRef.current.value === ""))
    {
      
    }else{
      alert("Preencha todos os campos");
    }
  }

  let emailRef = useRef();
  let senhaRef = useRef();



    return (
        <div>
        <div class="divider d-flex align-items-center my-4">
          <h2>TRUCOFIPP ONLINE</h2>
        </div>

        <div data-mdb-input-init class="form-outline mb-4">
          <input
            type="email"
            id="form3Example3"
            class="form-control form-control-lg"
            placeholder="Digitge um email Valido"
          />
          <label class="form-label" for="form3Example3">
            Email
          </label>
        </div>

        <div data-mdb-input-init class="form-outline mb-3">
          <input
            type="password"
            id="form3Example4"
            class="form-control form-control-lg"
            placeholder="Digite Sua senha"
          />
          <label class="form-label" for="form3Example4">
            Senha
          </label>
        </div>

        <div class="d-flex justify-content-between align-items-center">

          <a href="/login/registrar" class="text-body">
            Nao tem uma conta? Registre-se
          </a>
        </div>

        <div class="text-center text-lg-start mt-4 pt-2">
          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            class="btn btn-primary btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Login
          </button>
        </div>
      </div>
    )

}