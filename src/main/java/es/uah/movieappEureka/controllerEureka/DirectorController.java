package es.uah.movieappEureka.controllerEureka;
import es.uah.movieappEureka.modelEureka.Director;
import es.uah.movieappEureka.serviceEureka.IDirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("directores")
@CrossOrigin
public class DirectorController {

    @Autowired
    IDirectorService directorService;

    @GetMapping("")
    public Set<Director> buscarTodos(){
        return directorService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Director buscarDirectorPorId(@PathVariable("id") Integer id){
        return directorService.buscarDirectorPorId(id);
    }
    @GetMapping("/nombre/{nombre}")
    public Director buscarDirectorPorNombre(@PathVariable("nombre") String nombre){
        return directorService.buscarDirectorPorNombre(nombre);
    }
    @PostMapping("")
    public void guardarDirector(@RequestBody Director director){
         directorService.guardarDirector(director);
    }
    @PutMapping("")
    public void actualizarDirector(@RequestBody Director director){
        directorService.actualizarDirector(director);
    }
    @DeleteMapping("/{id}")
    public void eliminarDirector(@PathVariable("id") Integer id){
        directorService.eliminarDirector(id);
    }
    @GetMapping("/pelicula/agregar/{idDirector}/{idPelicula}")
    public void agregarPelicula(@PathVariable("idDirector") Integer idDirector, @PathVariable("idPelicula") Integer idPelicula){
        directorService.agregarPelicula(idDirector, idPelicula);
    }
}
