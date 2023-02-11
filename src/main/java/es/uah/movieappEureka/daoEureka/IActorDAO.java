package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Actor;

import java.util.Set;

public interface IActorDAO {
     Set<Actor> buscarTodos();
     Set<Actor> buscarActorPorIdPais(Integer idPais);
     Actor buscarActorPorNombre(String nombre);
     Actor buscarAutorPorId(Integer idAutor);
     void guardarAutor(Actor actor);
     void eliminarAutor(Integer idAutor);
     void actualizarAutor(Actor actor);

     void agregarPelicula(Integer idActor, Integer idPelicula);
}
