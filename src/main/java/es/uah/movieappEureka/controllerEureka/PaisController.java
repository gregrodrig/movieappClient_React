package es.uah.movieappEureka.controllerEureka;
import es.uah.movieappEureka.modelEureka.Pais;
import es.uah.movieappEureka.serviceEureka.IPaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pais")
@CrossOrigin
public class PaisController {
    @Autowired
    IPaisService paisService;

    @GetMapping("")
    public List<Pais> buscarTodos(){
        return paisService.buscarTodos();
    }
    @GetMapping("/{id}")
    public Pais buscarPaisPorId(@PathVariable("id") Integer id){
        return paisService.buscarPaisPorId(id);
    }
    @GetMapping("/pais/{pais}")
    public Pais buscarPaisPorPais(@PathVariable("pais") String pais){
        return paisService.buscarPaisPorPais(pais);
    }
    @PostMapping("")
    public void guardarPais(@RequestBody Pais pais){
        paisService.guardarPais(pais);
    }
    @PutMapping("")
    public void actualizarPais(@RequestBody Pais pais){
        paisService.actualizarPais(pais);
    }
    @DeleteMapping("/{id}")
    public void eliminiarPais(@PathVariable("id") Integer id){
        paisService.eliminarPais(id);
    }
}
