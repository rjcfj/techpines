import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";

function Show() {
  const navigate = useNavigate();
  const [id, setId] = useState(useParams().id);
  const [usuario, setUsuario] = useState({ name: "", description: "" });

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/api/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }

    axiosInstance
      .get(`/usuario/${id}`)
      .then(function (response) {
        setUsuario(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout title="Usuário">
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Mostrar Usuário</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-info float-right" to="/usuario">
              Voltar
            </Link>
          </div>
          <div className="card-body">
            <b className="text-muted">Nome:</b>
            <p>{usuario.name}</p>
            <b className="text-muted">Email:</b>
            <p>{usuario.email}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Show;
