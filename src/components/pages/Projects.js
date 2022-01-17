import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import LinkButton from "../layout/LinkButton"
import Container from "../layout/Container"
import Message from "../layout/Message"
import Loading from "../layout/Loading"

import ProjectCard from "../project/ProjectCard"

import styles from './Project.module.css'

function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()

  let message = ''
  if(location.state){
    message = location.state.message
  }

  useEffect(() => {

    fetch("http://localhost:5000/projects", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch(err => console.log(err))


  }, [])

  function removeProject(id){

    fetch(`http://localhost:5000/projects/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(data => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto removido com sucesso!')
    })
    .catch(err => console.log(err))

  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1> 
        <LinkButton to="/new-project" text="Criar Projeto"/>
      </div>
      { message && <Message msg={message} type="success"  /> }
      { projectMessage && <Message msg={projectMessage} type="success"  /> }
      <Container customClass="start">
        {
          projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard 
              id={project.id} 
              key={project.id}
              name={project.name} 
              budget={project.budget} 
              category={project.category.name}
              handleRemove={removeProject} 
              />
            ))
        }
        {!removeLoading && <Loading  />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados! </p>
        )}
      </Container>
    </div>
  )
}

export default Projects
