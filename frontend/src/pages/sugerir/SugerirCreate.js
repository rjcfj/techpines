import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../../components/Layout";

function Create() {
  const [sugerir, setSugerir] = useState("");
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
      .post("/extrair-video-id", { youtube_url: sugerir })
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Sugerir salvo com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setSugerir("");

        navigate("/dashboard");
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Sugerir Nova Música</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-info float-right" to="/dashboard">
              Voltar
            </Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">URL de Youtube</label>
                <input
                  onChange={(event) => {
                    setSugerir(event.target.value);
                  }}
                  value={sugerir}
                  type="url"
                  className="form-control"
                  placeholder="Cole aqui o link do YouTube"
                  id="sugerir"
                  name="sugerir"
                />
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-primary mt-3"
              >
                Enviar Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Create;
