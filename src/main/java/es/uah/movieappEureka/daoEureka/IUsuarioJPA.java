package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface IUsuarioJPA extends JpaRepository<Usuario, Integer> {
    Usuario findByNombreContainingIgnoreCase(String nombre);
    Usuario findByCorreo(String correo);
    Set<Usuario> findByTblRolIdRol(Integer idRol);
}