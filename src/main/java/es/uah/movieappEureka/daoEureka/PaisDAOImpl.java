package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Pais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class PaisDAOImpl implements IPaisDAO{

    @Autowired
    IPaisJPA paisJPA;
    @Override
    public List<Pais> buscarTodos() {
                return paisJPA.findAll();
    }

    @Override
    public Pais buscarPaisPorId(Integer idPais) {
        Optional<Pais> optional = paisJPA.findById(idPais); if (optional.isPresent()) { return optional.get(); } return null;
    }

    @Override
    public Pais buscarPaisPorPais(String pais) {
        return paisJPA.findByPais(pais);
    }

    @Override
    public void guardarPais(Pais pais) {
        paisJPA.save(pais);
    }

    @Override
    public void actualizarPais(Pais pais) {
        paisJPA.save(pais);
    }

    @Override
    public void eliminarPais(Integer idPais) {
        paisJPA.deleteById(idPais);
    }
}
