package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Repository
public class UsuarioDAOImpl implements IUsuarioDAO{

    @Autowired
    IUsuarioJPA usuarioJPA;

    @Override
    public Set<Usuario> buscarTodos() {
        return new HashSet<Usuario>(usuarioJPA.findAll());
    }

    @Override
    public Usuario buscarUsuarioPorId(Integer idUsuario) {
        Optional<Usuario> optional = usuarioJPA.findById(idUsuario);
        if (optional.isPresent()){
            return optional.get();
        }
        return null;
    }

    @Override
    public Usuario buscarUsuarioPorNombre(String nombre) {
        return usuarioJPA.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public Usuario buscarUsuarioPorCorreo(String correo) {
        return usuarioJPA.findByCorreo(correo);
    }

    @Override
    public Set<Usuario> buscarUsuarioPorRol(Integer idRol) {
        return usuarioJPA.findByTblRolIdRol(idRol);
    }

    @Override
    public void guardarUsuario(Usuario usuario) {
        usuarioJPA.save(usuario);
    }

    @Override
    public void eliminarUsuario(Integer idUsuario) {
        usuarioJPA.deleteById(idUsuario);
    }

    @Override
    public void actualizarUsuario(Usuario usuario) {
        usuarioJPA.save(usuario);
    }
}
