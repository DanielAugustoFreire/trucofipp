

export default function FormLogin(){


    return (
        <form>
        <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            class="btn btn-primary btn-floating mx-1"
          >
            <i class="fab fa-facebook-f"></i>
          </button>

          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            class="btn btn-primary btn-floating mx-1"
          >
            <i class="fab fa-twitter"></i>
          </button>

          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            class="btn btn-primary btn-floating mx-1"
          >
            <i class="fab fa-linkedin-in"></i>
          </button>
        </div>

        <div class="divider d-flex align-items-center my-4">
          <p class="text-center fw-bold mx-3 mb-0">Or</p>
        </div>

        <div data-mdb-input-init class="form-outline mb-4">
          <input
            type="email"
            id="form3Example3"
            class="form-control form-control-lg"
            placeholder="Enter a valid email address"
          />
          <label class="form-label" for="form3Example3">
            Email address
          </label>
        </div>

        <div data-mdb-input-init class="form-outline mb-3">
          <input
            type="password"
            id="form3Example4"
            class="form-control form-control-lg"
            placeholder="Enter password"
          />
          <label class="form-label" for="form3Example4">
            Password
          </label>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div class="form-check mb-0">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              id="form2Example3"
            />
            <label class="form-check-label" for="form2Example3"></label>
          </div>
          <a href="/cadastrar" class="text-body">
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
          <p class="small fw-bold mt-2 pt-1 mb-0">
            Don't have an account?{" "}
            <a href="#!" class="link-danger">
              Register
            </a>
          </p>
        </div>
      </form>
    )

}