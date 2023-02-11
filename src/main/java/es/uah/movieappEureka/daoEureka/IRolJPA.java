package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRolJPA extends JpaRepository<Rol, Integer> {
    Rol findByNombreRolContainingIgnoreCase(String nombre);
    Rol findRolByIdRol(Integer idRol);

}