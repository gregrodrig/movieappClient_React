package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.modelEureka.Genero;
import es.uah.movieappEureka.modelEureka.Pelicula;

import java.util.Set;

public interface IPeliculaService {
    Set<Pelicula> buscarTodas();
    Pelicula buscarPeliculaPorId(Integer idPelicula);
    Set<Pelicula> buscarPeliculaPorTitulo(String titulo);
    Set<Pelicula> findPeliculaByGenerosContainsIgnoreCaseOrDirectorsContainingIgnoreCaseOrActorsContainingIgnoreCaseOrTituloContainsIgnoreCase(String search);
    Set<Genero> buscarPeliculaPorGenero(String generos);

    //Director buscarPeliculaPorDirector(String director);
  /*  Actor buscarPeliculaPorActor(String actor);
    Director buscarPeliculaPorDirector(String director);
    Set<Pelicula>  findPeliculaByActorsContainingIgnoreCaseOrDirectorsContainingIgnoreCaseOrGenerosContainingIgnoreCaseOrTituloContainingIgnoreCase(String actor, String director, String genero, String titulo);
   */
    void guardarPelicula(Pelicula pelicula);
    void eliminarPelicula(Integer idPelicula);
    void actualizarPelicula(Pelicula pelicula);
}
