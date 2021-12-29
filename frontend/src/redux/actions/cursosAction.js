import axios from "axios";

const cursosAction = {
    filtroCursos: (cursos, value) => {
        return (dispatch, getState) => {
            dispatch({type: "FILTRO_CURSOS", payload:{cursos, value}})
        }
    },
    traerCursos:() => {
        return async(dispatch,getState) => {
            let respuesta = await axios.get("http://localhost:4000/api/cursos")
            dispatch({type: "CURSOS", payload: respuesta.data.response})
        }
    },
    traerCursoId:(cursoId) => {
        return async(dispatch,getState) => {
            let respuesta = await axios.get("http://localhost:4000/api/curso/" + cursoId) 
            dispatch({type: "CURSO_ID", payload: respuesta.data.response})
        }
    },
    favoritos: (usuarioId, cursoId) => {
        return async (dispatch, getState) => {
            if(usuarioId && cursoId){
                await axios.put("http://localhost:4000/api/like/", {usuarioId, cursoId} )
                let response = await axios.get("http://localhost:4000/api/cursoUsuarioId" , {usuarioId})
                dispatch({type: "FAVORITOS", payload: response.data.response})
            }else{
                console.log(error)
            }
        }
    }, 
    crearOpinion: ( cursoId, opinion, usuarioId) => {
        return async(dispatch, getState)=>{
            if(cursoId && usuarioId){
                await axios.post("http://localhost:4000/api/opiniones", {cursoId, opinion, usuarioId})
                let res = await axios.get("http://localhost:4000/api/opiniones")
                dispatch({type: "CURSOS", payload: res.data.response })
            }else{
                console.log(error)
            }
        }
    },
    traerOpiniones: () => {
        return async (dispatch, getState) => {
            let respuesta = await axios.get("http://localhost:4000/api/opiniones")
            dispatch({type: "CURSOS", payload: respuesta.data.response })
        }
    },
    editarOpinion: (opinionId, opinion) => {
        return async(dispatch, getState)=>{
            const token = localStorage.getItem("token")
            await axios.put("http://localhost:4000/api/opiniones" , {opinionId, opinion}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            let res = await axios.get("http://localhost:4000/api/opiniones")
            dispatch({type: "CURSOS", payload: res.data.response })
        }
    },
    borrarOpinion: (cursoId, opinionId) => {
        return async(dispatch, getState)=>{
            const token = localStorage.getItem("token")
            await axios.delete("http://localhost:4000/api/opiniones", {cursoId, opinionId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            let res = await axios.get("http://localhost:4000/api/opiniones")
            dispatch({type: "CURSOS", payload: res.data.response })
        }
    },
};

export default cursosAction;

