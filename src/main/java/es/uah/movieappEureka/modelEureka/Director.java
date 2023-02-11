package es.uah.movieappEureka.modelEureka;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "director", schema = "movierater")
public class Director {

    private static final long serialVersionUID = 1L;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "idDirector")
    private Integer idDirector;
    @Basic
    @Column(name = "nombre")
    private String nombre;

    @ManyToMany
    @JsonIgnore(true)
    @JoinTable(name = "pelicula_has_director", joinColumns = {
            @JoinColumn(name = "tblDirector_idDirector", referencedColumnName = "idDirector")},
            inverseJoinColumns = { @JoinColumn(name = "tblPelicula_idPelicula", referencedColumnName = "idPelicula")})
    private Set<Pelicula> peliculas = new LinkedHashSet<>();

    public Director() {
    }

    public Director(String nombre) {
        this.nombre = nombre;
    }

    public Director(Integer idDirector) {
        this.idDirector = idDirector;
    }

    public Director(Integer idDirector, String nombre) {
        this.idDirector = idDirector;
        this.nombre = nombre;
    }

    public Set<Pelicula> getPeliculas() {
        return peliculas;
    }

    public void setPeliculas(Set<Pelicula> peliculas) {
        this.peliculas = peliculas;
    }

    public Integer getIdDirector() {
        return idDirector;
    }

    public void setIdDirector(Integer idDirector) {
        this.idDirector = idDirector;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void agregarPelicula(Pelicula pelicula){
        if (pelicula != null){
            getPeliculas().add(pelicula);
            pelicula.agregarDirector(this);
        }
    }
    public void eliminarPelicula(Pelicula pelicula){
        if (pelicula != null){
            pelicula.eliminarDirector(this);
            getPeliculas().remove(pelicula);
        }
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Director director = (Director) o;
        return Objects.equals(idDirector, director.idDirector) && Objects.equals(nombre, director.nombre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDirector, nombre);
    }
}
