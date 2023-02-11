package es.uah.movieappEureka.modelEureka;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "genero", schema = "movierater")
public class Genero {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "idGenero")
    private Integer idGenero;
    @Basic
    @Column(name = "genero")
    private String genero;

    public Genero() {
    }

    public Genero(String genero) {
        this.genero = genero;
    }

    @ManyToMany
    @JsonIgnore(true)
    @JoinTable(name = "pelicula_has_genero", joinColumns = {
            @JoinColumn(name = "tblGenero_idGenero", referencedColumnName = "idGenero")},
            inverseJoinColumns = {@JoinColumn(name = "tblPelicula_idPelicula", referencedColumnName = "idPelicula")})
    private Set<Pelicula> peliculas = new LinkedHashSet<>();

    public Set<Pelicula> getPeliculas() {
        return peliculas;
    }

    public void setPeliculas(Set<Pelicula> peliculas) {
        this.peliculas = peliculas;
    }

    public Integer getIdGenero() {
        return idGenero;
    }

    public void setIdGenero(Integer idGenero) {
        this.idGenero = idGenero;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public void agregarPelicula(Pelicula pelicula){
        if (pelicula != null){
            getPeliculas().add(pelicula);
            pelicula.agregarGenero(this);
        }
    }
    public void eliminarPelicula(Pelicula pelicula){
        if (pelicula != null){
            pelicula.eliminarGenero(this);
            getPeliculas().remove(pelicula);
        }
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Genero genero1 = (Genero) o;
        return Objects.equals(idGenero, genero1.idGenero) && Objects.equals(genero, genero1.genero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idGenero, genero);
    }
}
