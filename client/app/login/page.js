import FormLogin from "./components/formLogin.js";

export default function Login() {

    function Login(){
        
    }
    return (
      <div className="mt-5">
        <section class="vh-100">
          <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="/img/LOGO_TRUCOFIPP.png"
                  class="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                <FormLogin></FormLogin>

              </div>
            </div>
          </div>
          <div class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div class="text-white mb-3 mb-md-0">
              Copyright © 2020. All rights reserved.
            </div>
  
            <div>
              <a href="#!" class="text-white me-4">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#!" class="text-white me-4">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#!" class="text-white me-4">
                <i class="fab fa-google"></i>
              </a>
              <a href="#!" class="text-white">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
  