import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from "../layout/Loading"
import Container from '../layout/Container'
import Message from "../layout/Message"

import ProjectForm from '../project/ProjectForm'

import styles from './Project.module.css'

function Project() {

  const { id } = useParams()

  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      setProject(data)
    })
    .catch(err => console.log(err))
  },[id])

  
  function editPost(project){
    setMessage('')

    if(project.budget < project.cost){
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
    }
    
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(!showProjectForm)
      setMessage('Projeto atualizado com sucesso!')
      setType('success')
    })
    .catch(err => console.log(err))
  }

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm(){
    setShowServiceForm(!showServiceForm)
  }

  return (
    <> 
      { 
        project.name ? (
          <Container customClass="column">
              <div className={styles.project_details}>
                <div className={styles.details_container}>
                  { message && <Message msg={message} type={type}  /> }
                  <h1>Projeto: {project.name}</h1>
                  <button className={styles.btn} onClick={toggleProjectForm}>
                    {
                      !showProjectForm ? 'Editar Projeto' : 'Fechar'
                    }
                  </button>
                  {
                      !showProjectForm ? (
                        <div className={styles.form}>
                          <p>
                            <span>Categoria:</span>
                            { project.category.name }
                          </p>
                          <p>
                            <span>Total de Orçamento: </span>
                            R${ project.budget }
                          </p>
                          <p>
                            <span>Total utiizado: </span>
                            R${ project.cost }
                          </p>
                        </div>
                      ) :
                      (
                        <div className={styles.form}>
                            <ProjectForm
                            handleSubmit={editPost}
                            btnText="Concluir Edição"
                            projectData={project}
                            />
                        </div>
                      )
                    }
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                      {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                    </button>
                    <div className={styles.project_info}>
                      { showServiceForm && (
                        <div>
                          ServiceForm
                        </div>
                      )
                      }
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass='start'>
                  <p>Items do Serviço</p>
                </Container>
              </div>
            </Container>
        ) : (
       <Loading  /> 
       )
      } 
    </>
  )
}

export default Project
