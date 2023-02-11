package es.uah.movieappEureka.controllerEureka;
import es.uah.movieappEureka.modelEureka.Rol;
import es.uah.movieappEureka.serviceEureka.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("roles")
@CrossOrigin
public class RolController {

    @Autowired
    IRolService rolService;
    @GetMapping("")
    public Set<Rol> buscarTodos(){
        return rolService.buscarTodos();
    }
    @GetMapping("/nombre/{nombre}")
    public Rol buscarRolPorNombre(@PathVariable("nombre") String nombre){
        return rolService.buscarRolPorNombre(nombre);
    }
    @GetMapping("/{id}")
    public Rol buscarRolPorId(@PathVariable("id") Integer id){
        return rolService.buscarRolPorId(id);
    }
    @PostMapping("")
    public void agregarRol(@RequestBody Rol rol){
        rolService.agregarRol(rol);
    }
    @DeleteMapping("{id}")
    public void eliminarRol(@PathVariable("id") Integer id){
        rolService.eliminarRol(id);
    }
    @PutMapping("")
    public void actualizarRol(@RequestBody Rol rol){
        rolService.actualizarRol(rol);
    }
}
