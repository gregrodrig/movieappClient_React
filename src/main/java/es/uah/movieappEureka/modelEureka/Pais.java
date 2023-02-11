package es.uah.movieappEureka.modelEureka;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "pais", schema = "movierater")
public class Pais {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "idPais")
    private Integer idPais;
    @Basic
    @Column(name = "pais")
    private String pais;

    @OneToMany(mappedBy = "tblpaisIdpaiss", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore(true)
    private Set<Actor> actors = new LinkedHashSet<>();

    @OneToMany(mappedBy = "paisByTblPaisIdPais", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore(true)
    private Set<Pelicula> peliculas = new LinkedHashSet<>();

    public Set<Pelicula> getPeliculas() {
        return peliculas;
    }

    public void setPeliculas(Set<Pelicula> peliculas) {
        this.peliculas = peliculas;
    }

    public Set<Actor> getActors() {
        return actors;
    }

    public void setActors(Set<Actor> actors) {
        this.actors = actors;
    }


    public Pais() {
    }

    public Integer getIdPais() {
        return idPais;
    }

    public void setIdPais(Integer idPais) {
        this.idPais = idPais;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pais pais1 = (Pais) o;
        return Objects.equals(idPais, pais1.idPais) && Objects.equals(pais, pais1.pais);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPais, pais);
    }
}
