import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("user") != null) {
      navigate("/dashboard");
    }
  }, []);

  const instance = axios.create({
    baseURL: "http://localhost:8001/api/",
  });

  const handleSave = () => {
    setIsSaving(true);
    instance
      .post("/register", {
        name: name,
        email: email,
        password: password,
        c_password: password_confirmation,
      })
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        Swal.fire({
          icon: "success",
          title: "Usuário salvo com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/dashboard");
        });
        setIsSaving(false);
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
      })
      .catch(function (error) {
        toast.error(
          <div>
            {error.response.data.message}:
            <br />
            {error.response.data.data.name ?? error.response.data.data.name}
            {error.response.data.data.name === undefined ? "" : <br />}
            {error.response.data.data.email ?? error.response.data.data.email}
            {error.response.data.data.email === undefined ? "" : <br />}
            {error.response.data.data.password ??
              error.response.data.data.password}
            {error.response.data.data.password === undefined ? "" : <br />}
            {error.response.data.data.c_password ??
              error.response.data.data.c_password}
            {error.response.data.data.c_password === undefined ? "" : <br />}
          </div>
        );
        setIsSaving(false);
      });
  };
  return (
    <Layout title="Criar novo conta">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Cria nova conta
                </h5>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Jhon Joe"
                    />
                    <label htmlFor="floatingInput">Nome</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      type="email"
                      className="form-control"
                      id="floatingemail"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingemail">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Senha</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      value={password_confirmation}
                      onChange={(event) => {
                        setPasswordConfirmation(event.target.value);
                      }}
                      type="password"
                      className="form-control"
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="password_confirmation "
                    />
                    <label htmlFor="password_confirmation">
                      Confirmação de Senha
                    </label>
                  </div>

                  <div className="d-grid">
                    <button
                      disabled={isSaving}
                      onClick={handleSave}
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="button"
                    >
                      Entrar
                    </button>
                  </div>
                  <hr className="my-4"></hr>

                  <div className="d-grid">
                    <Link
                      className="btn btn-outline-primary btn-login text-uppercase fw-bold"
                      to="/"
                    >
                      Voltar
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Registration;
