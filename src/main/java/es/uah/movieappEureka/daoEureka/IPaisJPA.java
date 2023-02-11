package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Pais;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPaisJPA extends JpaRepository<Pais, Integer> {
    Pais findByPais(String pais);
}