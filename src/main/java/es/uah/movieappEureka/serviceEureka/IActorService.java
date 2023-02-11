package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.modelEureka.Actor;

import java.util.Set;

public interface IActorService {
    Set<Actor> buscarTodos();
    Set<Actor> buscarActorPorIdPais(Integer idPais);
    Actor buscarAutorPorNombre(String nombre);
    Actor buscarActorPorId(Integer idAutor);
    void guardarActor(Actor actor);
    void eliminarActor(Integer idAutor);
    void actualizarActor(Actor actor);
    void agregarPelicula(Integer idActor, Integer idPelicula);
}
