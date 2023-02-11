package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Usuario;

import java.util.Set;

public interface IUsuarioDAO {
    Set<Usuario> buscarTodos();
    Usuario buscarUsuarioPorId(Integer idUsuario);
    Usuario buscarUsuarioPorNombre(String nombre);
    Usuario buscarUsuarioPorCorreo(String correo);
    Set<Usuario> buscarUsuarioPorRol(Integer idRol);
    void guardarUsuario(Usuario usuario);
    void eliminarUsuario(Integer idUsuario);
    void actualizarUsuario(Usuario usuario);
}
