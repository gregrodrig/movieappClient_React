package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Genero;
import es.uah.movieappEureka.modelEureka.Pelicula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Repository
public class GeneroDAOImpl implements IGeneroDAO{

    @Autowired
    IGeneroJPA generoJPA;

    @Autowired
    IPeliculaJPA peliculaJPA;

    @Override
    public Set<Genero> buscarTodos() {
        return new HashSet<Genero>(generoJPA.findAll());
    }

    @Override
    public Genero buscarGeneroPorId(Integer idGenero) {
        return generoJPA.findByIdGenero(idGenero);
    }

    @Override
    public void guardarGenero(Genero genero) {
        generoJPA.save(genero);
    }

    @Override
    public void eliminarGenero(Integer idGenero) {
        generoJPA.deleteById(idGenero);
    }

    @Override
    public void actualizarGenero(Genero genero) {
        generoJPA.save(genero);
    }

    @Override
    public void agregarPelicula(Integer idGenero, Integer idPelicula) {
        Optional<Genero> optionalGenero = generoJPA.findById(idGenero);
        if (optionalGenero.isPresent()){
            Genero genero = optionalGenero.get();
            Optional<Pelicula> optionalPelicula = peliculaJPA.findById(idPelicula);
            if (optionalPelicula.isPresent()){
                genero.agregarPelicula(optionalPelicula.get());
                generoJPA.save(genero);
            }
        }
    }
}
