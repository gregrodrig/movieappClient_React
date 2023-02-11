package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.modelEureka.Genero;

import java.util.Set;

public interface IGeneroService {

    Set<Genero> buscarTodos();
    Genero buscarGeneroPorId(Integer idGenero);
    void guardarGenero(Genero genero);
    void eliminarGenero(Integer idGenero);
    void actualizarGenero(Genero genero);
    void agregarPelicula(Integer idGenero, Integer idPelicula);
}
