package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

@Repository
public class RolDAOImpl implements IRolDAO{

    @Autowired
    IRolJPA rolJPA;

    @Override
    public Set<Rol> buscarTodos() {
        return new HashSet<Rol>(rolJPA.findAll());
    }

    @Override
    public Rol buscarRolPorNombre(String nombre) {
        return rolJPA.findByNombreRolContainingIgnoreCase(nombre);
    }

    @Override
    public Rol buscarRolPorId(Integer idRol) {
        return rolJPA.findRolByIdRol(idRol);
    }

    @Override
    public void agregarRol(Rol rol) {
        rolJPA.save(rol);
    }

    @Override
    public void eliminarRol(Integer idRol) {
        rolJPA.deleteById(idRol);
    }

    @Override
    public void actualizarRol(Rol rol) {
        rolJPA.save(rol);
    }
}
