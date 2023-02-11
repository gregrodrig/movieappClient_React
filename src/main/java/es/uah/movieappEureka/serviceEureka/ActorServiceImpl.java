package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.daoEureka.IActorDAO;
import es.uah.movieappEureka.modelEureka.Actor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ActorServiceImpl implements IActorService{

    @Autowired
    IActorDAO actorDAO;

    @Override
    public Set<Actor> buscarTodos() {
        return actorDAO.buscarTodos();
    }

    @Override
    public Set<Actor> buscarActorPorIdPais(Integer idPais) {
        return actorDAO.buscarActorPorIdPais(idPais);
    }

    @Override
    public Actor buscarActorPorId(Integer idAutor) {
        return actorDAO.buscarAutorPorId(idAutor);
    }

    @Override
    public Actor buscarAutorPorNombre(String nombre){ return  actorDAO.buscarActorPorNombre(nombre); }

    @Override
    public void guardarActor(Actor actor) {
        actorDAO.guardarAutor(actor);
    }

    @Override
    public void eliminarActor(Integer idAutor) {
        actorDAO.eliminarAutor(idAutor);
    }

    @Override
    public void actualizarActor(Actor actor) {
        actorDAO.actualizarAutor(actor);
    }

    @Override
    public void agregarPelicula(Integer idActor, Integer idPelicula) {
        actorDAO.agregarPelicula(idActor, idPelicula);
    }
}
