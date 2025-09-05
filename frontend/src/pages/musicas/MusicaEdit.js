import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";

function Edit() {
  const [id, setId] = useState(useParams().id);
  const [titulo, setTitulo] = useState("");
  const [visualizacoes, setVisualizacoes] = useState("");
  const [youtube_id, setYoutubeId] = useState("");
  const [thumb, setThumb] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

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
        let data = response.data.data;

        setTitulo(data.titulo);
        setVisualizacoes(data.visualizacoes);
        setYoutubeId(data.youtube_id);
        setThumb(data.thumb);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    axiosInstance
      .patch(`/musica/${id}`, {
        titulo: titulo,
        visualizacoes: visualizacoes,
        youtube_id: youtube_id,
        thumb: thumb,
      })
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Música atualizada com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setTitulo("");
        setVisualizacoes("");
        setYoutubeId("");
        setThumb("");
        navigate("/dashboard");
      })
      .catch(function (error) {
        toast.error(
          <div>
            {error.response.data.message}:
            <br />
            {error.response.data.data.titulo ?? error.response.data.data.titulo}
            {error.response.data.data.titulo === undefined ? "" : <br />}
            {error.response.data.data.visualizacoes ??
              error.response.data.data.visualizacoes}
            {error.response.data.data.visualizacoes === undefined ? "" : <br />}
            {error.response.data.data.youtube_id ??
              error.response.data.data.youtube_id}
            {error.response.data.data.youtube_id === undefined ? "" : <br />}
            {error.response.data.data.thumb ?? error.response.data.data.thumb}
            {error.response.data.data.thumb === undefined ? "" : <br />}
          </div>
        );
        setIsSaving(false);
      });
  };

  return (
    <Layout title="Música">
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Editar Música</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-info float-right" to="/musica">
              Voltar
            </Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Título</label>
                <input
                  onChange={(event) => {
                    setTitulo(event.target.value);
                  }}
                  value={titulo}
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="titulo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Visualizações</label>
                <input
                  onChange={(event) => {
                    setVisualizacoes(event.target.value);
                  }}
                  value={visualizacoes}
                  type="text"
                  className="form-control"
                  id="visualizacoes"
                  name="visualizacoes"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Código YouTube</label>
                <input
                  onChange={(event) => {
                    setYoutubeId(event.target.value);
                  }}
                  value={youtube_id}
                  type="text"
                  className="form-control"
                  id="youtube_id"
                  name="youtube_id"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">URL de Imagem do Youtube</label>
                <input
                  onChange={(event) => {
                    setThumb(event.target.value);
                  }}
                  value={thumb}
                  type="text"
                  className="form-control"
                  id="thumb"
                  name="thumb"
                />
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-success mt-3"
              >
                Atualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Edit;
