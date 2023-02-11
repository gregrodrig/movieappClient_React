package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Actor;
import es.uah.movieappEureka.modelEureka.Pelicula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Repository
public class ActorDAOImpl implements IActorDAO{

    @Autowired
    IActorJPA actorJPA;

    @Autowired
    IPeliculaJPA peliculaJPA;

    @Override
    public Set<Actor> buscarTodos() {
        return new HashSet<Actor>(actorJPA.findAll());
    }

    @Override
    public Set<Actor> buscarActorPorIdPais(Integer idPais) {
        return actorJPA.findByTblPaisIdPais(idPais);
    }

    @Override
    public Actor buscarActorPorNombre(String nombre) {
        return actorJPA.findActorByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public Actor buscarAutorPorId(Integer idAutor) {
        Optional<Actor> optional = actorJPA.findById(idAutor);
        if (optional.isPresent()){
            return optional.get();
        }
        return null;
    }

    @Override
    public void guardarAutor(Actor actor) {
        actorJPA.save(actor);
    }

    @Override
    public void eliminarAutor(Integer idAutor) {
        Optional<Actor> optional = actorJPA.findById(idAutor);
        if (optional.isPresent()){
            Actor actor = optional.get();
            Set<Pelicula> peliculas = actor.getPeliculas();
            for (Pelicula pelicula: peliculas){
                peliculas.remove(actor);
            }
        }
        actorJPA.deleteById(idAutor);
    }

    @Override
    public void actualizarAutor(Actor actor) {
        actorJPA.save(actor);
    }

    @Override
    public void agregarPelicula(Integer idActor, Integer idPelicula) {
        Optional<Actor> optionalActor = actorJPA.findById(idActor);
        if (optionalActor.isPresent()){
            Actor actor = optionalActor.get();
            Optional<Pelicula> optionalPelicula = peliculaJPA.findById(idPelicula);
            if (optionalPelicula.isPresent()){
                actor.agregarPelicula(optionalPelicula.get());
                actorJPA.save(actor);
            }
        }
    }
}
