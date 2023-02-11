package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.daoEureka.IDirectorDAO;
import es.uah.movieappEureka.modelEureka.Director;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class DirectorServiceImpl implements IDirectorService{

    @Autowired
    IDirectorDAO directorDAO;

    @Override
    public Set<Director> buscarTodos() {
        return directorDAO.buscarTodos();
    }

    @Override
    public Director buscarDirectorPorId(Integer idDirector) {
        return directorDAO.buscarDirectorPorId(idDirector);
    }

    @Override
    public Director buscarDirectorPorNombre(String nombre) {
        return directorDAO.buscarDirectorPorNombre(nombre);
    }

    @Override
    public void guardarDirector(Director director) {
        directorDAO.guardarDirector(director);
    }

    @Override
    public void eliminarDirector(Integer idDirector) {
        directorDAO.eliminarDirector(idDirector);
    }

    @Override
    public void actualizarDirector(Director director) {
        directorDAO.actualizarDirector(director);
    }

    @Override
    public void agregarPelicula(Integer idDirector, Integer idPelicula) {
        directorDAO.agregarPelicula(idDirector, idPelicula);
    }
}
