package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Rol;

import java.util.Set;

public interface IRolDAO {
    Set<Rol> buscarTodos();
    Rol buscarRolPorNombre(String nombre);
    Rol buscarRolPorId(Integer idRol);
    void agregarRol(Rol rol);
    void eliminarRol(Integer idRol);
    void actualizarRol(Rol rol);
}
