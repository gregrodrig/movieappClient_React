package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.daoEureka.IGeneroDAO;
import es.uah.movieappEureka.modelEureka.Genero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class GeneroServiceImpl implements IGeneroService{

    @Autowired
    IGeneroDAO generoDAO;

    @Override
    public Set<Genero> buscarTodos() {
        return generoDAO.buscarTodos();
    }

    @Override
    public Genero buscarGeneroPorId(Integer idGenero) {
        return generoDAO.buscarGeneroPorId(idGenero);
    }

    @Override
    public void guardarGenero(Genero genero) {
        generoDAO.guardarGenero(genero);
    }

    @Override
    public void eliminarGenero(Integer idGenero) {
        generoDAO.eliminarGenero(idGenero);
    }

    @Override
    public void actualizarGenero(Genero genero) {
        generoDAO.actualizarGenero(genero);
    }

    @Override
    public void agregarPelicula(Integer idGenero, Integer idPelicula) {
        generoDAO.agregarPelicula(idGenero, idPelicula);
    }
}
