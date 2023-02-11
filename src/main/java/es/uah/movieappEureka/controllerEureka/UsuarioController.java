package es.uah.movieappEureka.controllerEureka;
import es.uah.movieappEureka.modelEureka.Usuario;
import es.uah.movieappEureka.serviceEureka.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("usuarios")
@CrossOrigin
public class UsuarioController {

    @Autowired
    IUsuarioService usuarioService;
    @GetMapping("")
    public Set<Usuario> buscarTodos(){
        return usuarioService.buscarTodos();
    }
    @GetMapping("/{id}")
    public Usuario buscarUsuarioPorId(@PathVariable("id") Integer id){
        return usuarioService.buscarUsuarioPorId(id);
    }
    @GetMapping("/nombre/{nombre}")
    public Usuario buscarUsuarioPorNombre(@PathVariable("nombre") String nombre){
        return usuarioService.buscarUsuarioPorNombre(nombre);
    }
    @GetMapping("/correo/{correo}")
    public Usuario buscarUsuarioPorCorreo(@PathVariable("correo") String correo){
        return usuarioService.buscarUsuarioPorCorreo(correo);
    }
    @GetMapping("/rol/{idRol}")
    public Set<Usuario> buscarUsuarioPorRol(@PathVariable("idRol") Integer idRol){
        return usuarioService.buscarUsuarioPorRol(idRol);
    }
    @PostMapping("")
    public void guardarUsuario(@RequestBody Usuario usuario){
        usuarioService.guardarUsuario(usuario);
    }
    @PutMapping("")
    public void actualizarUsuario(@RequestBody Usuario usuario){
        usuarioService.actualizarUsuario(usuario);
    }
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable("id") Integer id){
        usuarioService.eliminarUsuario(id);
    }
}
