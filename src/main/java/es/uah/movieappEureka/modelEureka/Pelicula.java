package es.uah.movieappEureka.modelEureka;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "pelicula", schema = "movierater")
public class Pelicula {

    private static final long serialVersionUID = 1L;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "idPelicula")
    private Integer idPelicula;
    @Basic
    @Column(name = "titulo")
    private String titulo;
    @Basic
    @Column(name = "duracion")
    private Integer duracion;
    @Basic
    @Column(name = "sinopsis")
    private String sinopsis;
    @Basic
    @Column(name = "imagen")
    private String imagen;
    @Basic
    @Column(name = "anno")
    private Date anno;
    @Basic
    @Column(name = "tblPais_idPais")
    private Integer tblPaisIdPais;
    @ManyToOne
    @JoinColumn(name = "tblPais_idPais", referencedColumnName = "idPais", nullable = false, updatable = false, insertable = false)
    private Pais paisByTblPaisIdPais;

    @ManyToMany(mappedBy = "peliculas")
   // @JsonIgnore(true)
    @JsonBackReference
    private Set<Actor> actors = new LinkedHashSet<>();

    public Pelicula() {
    }

    public Pelicula(String titulo, Integer duracion, String sinopsis, String imagen, Date anno, Integer tblPaisIdPais) {
        this.titulo = titulo;
        this.duracion = duracion;
        this.sinopsis = sinopsis;
        this.imagen = imagen;
        this.anno = anno;
        this.tblPaisIdPais = tblPaisIdPais;
    }

    public Pelicula(Set<Actor> actors) {
        this.actors = actors;
    }

    @ManyToMany(mappedBy = "peliculas")
    private Set<Genero> generos = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "peliculas")
    private Set<Director> directors = new LinkedHashSet<>();

    public Set<Director> getDirectors() {
        return directors;
    }

    public void setDirectors(Set<Director> directors) {
        this.directors = directors;
    }

    public Set<Genero> getGeneros() {
        return generos;
    }

    public void setGeneros(Set<Genero> generos) {
        this.generos = generos;
    }

    public Set<Actor> getActors() {
        return actors;
    }

    public void setActors(Set<Actor> actors) {
        this.actors = actors;
    }

    public Integer getIdPelicula() {
        return idPelicula;
    }

    public void setIdPelicula(Integer idPelicula) {
        this.idPelicula = idPelicula;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String tiltulo) {
        this.titulo = tiltulo;
    }

    public Integer getDuracion() {
        return duracion;
    }

    public void setDuracion(Integer duracion) {
        this.duracion = duracion;
    }

    public String getSinopsis() {
        return sinopsis;
    }

    public void setSinopsis(String sinopsis) {
        this.sinopsis = sinopsis;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Date getAnno() {
        return anno;
    }

    public void setAnno(Date anno) {
        this.anno = anno;
    }

    public Integer getTblPaisIdPais() {
        return tblPaisIdPais;
    }

    public void setTblPaisIdPais(Integer tblPaisIdPais) {
        this.tblPaisIdPais = tblPaisIdPais;
    }

    public void agregarGenero(Genero genero){
        if (genero != null){
            getGeneros().add(genero);
        }
    }
    public void eliminarGenero(Genero genero){
        if (genero != null){
            getGeneros().remove(genero);
        }
    }

    public void agregarDirector(Director director){
        if (director != null){
            getDirectors().add(director);
        }
    }
    public void eliminarDirector(Director director){
        if (director != null){
            getDirectors().remove(director);
        }
    }
    public void agregarActor(Actor actor){
        if (actor != null){
            getActors().add(actor);
        }
    }
    public void eliminarActor(Actor actor){
        if (actor != null){
            getActors().remove(actor);
        }
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pelicula pelicula = (Pelicula) o;
        return Objects.equals(idPelicula, pelicula.idPelicula) && Objects.equals(titulo, pelicula.titulo) && Objects.equals(duracion, pelicula.duracion) && Objects.equals(sinopsis, pelicula.sinopsis) && Objects.equals(imagen, pelicula.imagen) && Objects.equals(anno, pelicula.anno) && Objects.equals(tblPaisIdPais, pelicula.tblPaisIdPais);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPelicula, titulo, duracion, sinopsis, imagen, anno, tblPaisIdPais);
    }

    public Pais getPaisByTblPaisIdPais() {
        return paisByTblPaisIdPais;
    }

    public void setPaisByTblPaisIdPais(Pais paisByTblPaisIdPais) {
        this.paisByTblPaisIdPais = paisByTblPaisIdPais;
    }
}
