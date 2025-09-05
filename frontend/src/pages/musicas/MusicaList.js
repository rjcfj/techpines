import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
      .get("/musica")
      .then(function (response) {
        setList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, apague!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/musica/${id}`)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Música excluída com sucesso!",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchList();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Ocorreu um erro!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout title="Música">
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Músicas</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary" to="/musica/novo">
              Criar Nova Música
            </Link>
            <button
              onClick={() => Logout()}
              className="btn btn-danger float-end"
            >
              Sair
            </button>
            <Link className="btn btn-danger float-end me-2" to="/dashboard">
              Voltar
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Título</th>
                  <th>Visualizações</th>
                  <th>ID Youtube</th>
                  <th width="260px">Ação</th>
                </tr>
              </thead>
              <tbody>
                {List.map((musica, key) => {
                  return (
                    <tr key={key}>
                      <td>{musica.id}</td>
                      <td>{musica.titulo}</td>
                      <td>{musica.visualizacoes}</td>
                      <td>{musica.youtube_id}</td>
                      <td>
                        <Link
                          to={`/musica/mostrar/${musica.id}`}
                          className="btn btn-outline-info mx-1"
                        >
                          Mostrar
                        </Link>
                        <Link
                          className="btn btn-outline-success mx-1"
                          to={`/musica/editar/${musica.id}`}
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(musica.id)}
                          className="btn btn-outline-danger mx-1"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default List;
