package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Director;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface IDirectorJPA extends JpaRepository<Director, Integer> {
    Director findByNombreContainingIgnoreCase(String nombre);
}