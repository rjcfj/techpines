import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MusicCard.css";
import axios from "axios";
import Layout from "../../components/Layout";

function List() {
  const navigate = useNavigate();
  const [List, setList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
    fetchList();
  }, []);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/api/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchList = () => {
    axiosInstance
      .get("/musicas/top-5")
      .then(function (response) {
        setList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Top 5 Músicas</h2>
        <h4 className="text-center mt-5 mb-3">Ranking Atual</h4>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary me-2" to="/musica">
              Músicas
            </Link>
            <Link className="btn btn-outline-primary me-2" to="/musica/link">
              Sugerir
            </Link>
            <Link className="btn btn-outline-primary me-2" to="/usuario">
              Usuários
            </Link>
            <button
              onClick={() => Logout()}
              className="btn btn-outline-danger float-end"
            >
              Sair
            </button>
          </div>
          <div className="card-body">
            {List.map((musica, key) => {
              return (
                <a
                  href={`https://www.youtube.com/watch?v=${musica.youtube_id}`}
                  key={key}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="music-card-link"
                >
                  <div className="music-card">
                    <div className="rank">{key + 1}</div>
                    <div className="music-info">
                      <div className="music-title">{musica.titulo}</div>
                      <div className="views">
                        {musica.visualizacoes} visualizações
                      </div>
                    </div>
                    <img
                      src={musica.thumb}
                      alt={`Thumbnail ${musica.titulo}`}
                      className="thumbnail"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default List;
