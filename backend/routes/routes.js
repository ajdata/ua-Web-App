const Router = require ('express').Router()
const {nuevoUsuario, usuariosRegistrados, inicioSesion} = require('../controllers/usuarioController')
const {crearCurso, traerCursos, modificarCurso, borrarCurso, favorito} = require('../controllers/cursosController')


Router.route('/registrarse')
.post(nuevoUsuario)
.get(usuariosRegistrados)

Router.route('/inicioSesion')
.post(inicioSesion)

Router.route('/cursos')
.post(crearCurso)
.get(traerCursos)

Router.route('/curso/:id')
.put(modificarCurso)
.delete(borrarCurso)

Router.route('/favoritos')
.put(favorito)

module.exports = Router