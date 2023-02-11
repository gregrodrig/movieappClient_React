package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface IActorJPA extends JpaRepository<Actor, Integer> {
    Set<Actor> findByTblPaisIdPais(Integer idPais);
    Actor findActorByNombreContainingIgnoreCase(String nombre);

}