package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Director;

import java.util.Set;

public interface IDirectorDAO {

    Set<Director> buscarTodos();
    Director buscarDirectorPorId(Integer idDirector);
    Director buscarDirectorPorNombre(String nombre);
    void guardarDirector(Director director);
    void eliminarDirector(Integer idDirector);
    void actualizarDirector(Director director);

    void agregarPelicula(Integer idDirector, Integer idPelicula);
}
