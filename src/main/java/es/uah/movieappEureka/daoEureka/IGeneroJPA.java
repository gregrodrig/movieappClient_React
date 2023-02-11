package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Genero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface IGeneroJPA extends JpaRepository<Genero, Integer> {
       Genero findByIdGenero (Integer idGenero);
}