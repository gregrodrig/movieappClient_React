package es.uah.movieappEureka.modelEureka;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Date;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "actor", schema = "movierater")
public class Actor {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "idActor")
    private Integer idActor;
    @Basic
    @Column(name = "nombre")
    private String nombre;
    @Basic
    @Column(name = "apellidos")
    private String apellidos;
    @Basic
    @Column(name = "fechaNacimiento")
    private Date fechaNacimiento;
    @Basic
    @Column(name = "tblPais_idPais")
    private Integer tblPaisIdPais;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tblPais_idPais", nullable = false, updatable = false, insertable = false)
    @JsonIgnore(true)
    private Pais tblpaisIdpaiss;

    @ManyToMany
    @JsonIgnore(true)
    @JoinTable(name = "pelicula_has_actor", joinColumns = {
            @JoinColumn(name = "tblActor_idActor", referencedColumnName = "idActor")},
            inverseJoinColumns = { @JoinColumn(name = "tblPelicula_idPelicula", referencedColumnName = "idPelicula")})
    private Set<Pelicula> peliculas = new LinkedHashSet<>();

    public Set<Pelicula> getPeliculas() {
        return peliculas;
    }

    public void setPeliculas(Set<Pelicula> peliculas) {
        this.peliculas = peliculas;
    }

    public Pais getTblpaisIdpaiss() {
        return tblpaisIdpaiss;
    }

    public void setTblpaisIdpaiss(Pais tblpaisIdpaiss) {
        this.tblpaisIdpaiss = tblpaisIdpaiss;
    }

    public Integer getIdActor() {
        return idActor;
    }

    public void setIdActor(Integer idActor) {
        this.idActor = idActor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Integer getTblPaisIdPais() {
        return tblPaisIdPais;
    }

    public void setTblPaisIdPais(Integer tblPaisIdPais) {
        this.tblPaisIdPais = tblPaisIdPais;
    }

    public void agregarPelicula(Pelicula pelicula){
        if (pelicula != null){
            getPeliculas().add(pelicula);
            pelicula.agregarActor(this);
        }
    }
    public void eliminarPelicula(Pelicula pelicula){
        if (pelicula != null){
            pelicula.eliminarActor(this);
            getPeliculas().remove(pelicula);
        }
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Actor actor = (Actor) o;
        return Objects.equals(idActor, actor.idActor) && Objects.equals(nombre, actor.nombre) && Objects.equals(apellidos, actor.apellidos) && Objects.equals(fechaNacimiento, actor.fechaNacimiento) && Objects.equals(tblPaisIdPais, actor.tblPaisIdPais);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idActor, nombre, apellidos, fechaNacimiento, tblPaisIdPais);
    }
}
