import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, []);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/api/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const handleSave = () => {
    setIsSaving(true);
    axiosInstance
      .post("/usuario", {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password,
      })
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Usuário salva com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/dashboard");
      })
      .catch(function (error) {
        toast.error(
          <div>
            {error.response.data.message}:
            <br />
            {error.response.data.data.name ?? error.response.data.data.name}
            {error.response.data.data.name === undefined ? "" : <br />}
            {error.response.data.data.email ??
              error.response.data.data.email}
            {error.response.data.data.email === undefined ? "" : <br />}
            {error.response.data.data.password ??
              error.response.data.data.password}
            {error.response.data.data.password === undefined ? "" : <br />}
            {error.response.data.data.confirm_password ?? error.response.data.data.confirm_password}
            {error.response.data.data.confirm_password === undefined ? "" : <br />}
          </div>
        );
        setIsSaving(false);
      });
  };

  return (
    <Layout title="Usuário">
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Criar novo Usuário</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-info float-right" to="/usuario">
              Voltar
            </Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Senha</label>
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Confirmar senha</label>
                <input
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  value={confirm_password}
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirm_password"
                />
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-primary mt-3"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Create;
