package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Director;
import es.uah.movieappEureka.modelEureka.Pelicula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Repository
public class DirectorDAOImpl implements IDirectorDAO{

    @Autowired
    IDirectorJPA directorJPA;

    @Autowired
    IPeliculaJPA peliculaJPA;

    @Override
    public Set<Director> buscarTodos() {
        return  new HashSet<Director>(directorJPA.findAll());
    }

    @Override
    public Director buscarDirectorPorId(Integer idDirector) {
        Optional<Director> optional = directorJPA.findById(idDirector);
        if (optional.isPresent()){
            return optional.get();
        }
        return null;
    }

    @Override
    public Director buscarDirectorPorNombre(String nombre) {
        return directorJPA.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public void guardarDirector(Director director) {
        directorJPA.save(director);
    }

    @Override
    public void eliminarDirector(Integer idDirector) {
        Optional<Director> optional = directorJPA.findById(idDirector);
        if (optional.isPresent()){
            Director director = optional.get();
            Set<Pelicula> peliculas = director.getPeliculas();
            for (Pelicula pelicula: peliculas){
                peliculas.remove(director);
            }
        }
        directorJPA.deleteById(idDirector);
    }

    @Override
    public void actualizarDirector(Director director) {
        directorJPA.save(director);
    }

    @Override
    public void agregarPelicula(Integer idDirector, Integer idPelicula) {
        Optional<Director> optionalDirector = directorJPA.findById(idDirector);
        if (optionalDirector.isPresent()){
            Director director = optionalDirector.get();
            Optional<Pelicula> optionalPelicula = peliculaJPA.findById(idPelicula);
            if (optionalPelicula.isPresent()){
                director.agregarPelicula(optionalPelicula.get());
                directorJPA.save(director);
            }
        }
    }
}
