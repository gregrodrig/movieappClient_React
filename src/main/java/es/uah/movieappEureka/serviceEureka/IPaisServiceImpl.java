package es.uah.movieappEureka.serviceEureka;
import es.uah.movieappEureka.daoEureka.IPaisDAO;
import es.uah.movieappEureka.modelEureka.Pais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IPaisServiceImpl implements IPaisService{

    @Autowired
    IPaisDAO paisDAO;

    @Override
    public List<Pais> buscarTodos() {
        return paisDAO.buscarTodos();
    }

    @Override
    public Pais buscarPaisPorId(Integer idPais) {
        return paisDAO.buscarPaisPorId(idPais);
    }

    @Override
    public Pais buscarPaisPorPais(String pais) {
        return paisDAO.buscarPaisPorPais(pais);
    }

    @Override
    public void guardarPais(Pais pais) {
        paisDAO.guardarPais(pais);
    }

    @Override
    public void actualizarPais(Pais pais) {
        paisDAO.actualizarPais(pais);
    }

    @Override
    public void eliminarPais(Integer idPais) {
        paisDAO.eliminarPais(idPais);
    }
}
