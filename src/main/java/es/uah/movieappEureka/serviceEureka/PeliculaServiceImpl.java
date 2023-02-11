package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.daoEureka.IPeliculaDAO;
import es.uah.movieappEureka.modelEureka.Genero;
import es.uah.movieappEureka.modelEureka.Pelicula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class PeliculaServiceImpl implements IPeliculaService{

    @Autowired
    IPeliculaDAO peliculaDAO;

    @Override
    public Set<Pelicula> buscarTodas() {
       return peliculaDAO.buscarTodas();
    }

    @Override
    public Pelicula buscarPeliculaPorId(Integer idPelicula) {
        return peliculaDAO.buscarPeliculaPorId(idPelicula);
    }

    @Override
    public Set<Pelicula> buscarPeliculaPorTitulo(String titulo) {
        return peliculaDAO.buscarPeliculaPorTitulo(titulo);
    }

    @Override
    public Set<Pelicula> findPeliculaByGenerosContainsIgnoreCaseOrDirectorsContainingIgnoreCaseOrActorsContainingIgnoreCaseOrTituloContainsIgnoreCase(String search){
        return peliculaDAO.findPeliculaByGenerosContainsIgnoreCaseOrDirectorsContainingIgnoreCaseOrActorsContainingIgnoreCaseOrTituloContainsIgnoreCase(search);
    }
    @Override
    public Set<Genero> buscarPeliculaPorGenero(String generos) {
        return peliculaDAO.buscarPeliculaPorGenero(generos);
    }
   /* @Override
    public Director buscarPeliculaPorDirector(String director){
        return peliculaDAO.buscarPeliculaPorDirector(director);
    }*/
/*
    @Override
    public Actor buscarPeliculaPorActor(String actor) {
        return peliculaDAO.buscarPeliculaPorActor(actor);
    }


    @Override
    public Director buscarPeliculaPorDirector(String director) {
        return peliculaDAO.buscarPeliculaPorDirector(director);
    }

    @Override
    public Set<Pelicula> findPeliculaByActorsContainingIgnoreCaseOrDirectorsContainingIgnoreCaseOrGenerosContainingIgnoreCaseOrTituloContainingIgnoreCase(String actor, String director, String genero, String titulo) {
        return peliculaDAO.findPeliculaByActorsContainingIgnoreCaseOrDirectorsContainingIgnoreCaseOrGenerosContainingIgnoreCaseOrTituloContainingIgnoreCase(actor, director, genero, titulo);
    }
*/
    @Override
    public void guardarPelicula(Pelicula pelicula) {
        if (peliculaDAO.buscarPeliculaPorId(pelicula.getIdPelicula()) ==null){
            peliculaDAO.guardarPelicula(pelicula);
        }
    }

    @Override
    public void eliminarPelicula(Integer idPelicula) {
        if (peliculaDAO.buscarPeliculaPorId(idPelicula) !=null){
            peliculaDAO.eliminarPelicula(idPelicula);
        }
    }

    @Override
    public void actualizarPelicula(Pelicula pelicula) {
        if (peliculaDAO.buscarPeliculaPorId(pelicula.getIdPelicula()) !=null){
            peliculaDAO.actualizarPelicula(pelicula);
        }
    }
}
