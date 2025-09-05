import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";

function Show() {
  const navigate = useNavigate();
  const [id, setId] = useState(useParams().id);
  const [musica, setMusica] = useState({ name: "", description: "" });

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
      .get(`/musica/${id}`)
      .then(function (response) {
        setMusica(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout title="Música">
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Mostrar Música</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-info float-right" to="/musica">
              Voltar
            </Link>
          </div>
          <div className="card-body">
            <b className="text-muted">Título:</b>
            <p>{musica.titulo}</p>
             <b className="text-muted">visualizacoes:</b>
            <p>{musica.visualizacoes}</p>
             <b className="text-muted">youtube_id:</b>
            <p>{musica.youtube_id}</p>
            <b className="text-muted">Imagem:</b>
            <p>
              <img src={musica.thumb} alt={musica.titulo} />
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Show;
