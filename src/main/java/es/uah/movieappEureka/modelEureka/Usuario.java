package es.uah.movieappEureka.modelEureka;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "usuario", schema = "movierater")
public class Usuario {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "idUsuario")
    private Integer idUsuario;
    @Basic
    @Column(name = "nombre")
    private String nombre;
    @Basic
    @Column(name = "apellidos")
    private String apellidos;
    @Basic
    @Column(name = "correo")
    private String correo;
    @Basic
    @Column(name = "tblRol_idRol")
    private Integer tblRolIdRol;
    @ManyToOne
    @JoinColumn(name = "tblRol_idRol", referencedColumnName = "idRol", nullable = false, updatable = false, insertable = false)
    private Rol rolByTblRolIdRol;

    public Usuario() {
    }
    public Usuario(String nombre, String apellidos, String correo, Integer tblRolIdRol) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.tblRolIdRol = tblRolIdRol;
    }

    public Usuario(Rol rolByTblRolIdRol) {
        this.rolByTblRolIdRol = rolByTblRolIdRol;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
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

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Integer getTblRolIdRol() {
        return tblRolIdRol;
    }

    public void setTblRolIdRol(Integer tblRolIdRol) {
        this.tblRolIdRol = tblRolIdRol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(idUsuario, usuario.idUsuario) && Objects.equals(nombre, usuario.nombre) && Objects.equals(apellidos, usuario.apellidos) && Objects.equals(correo, usuario.correo) && Objects.equals(tblRolIdRol, usuario.tblRolIdRol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario, nombre, apellidos, correo, tblRolIdRol);
    }

    public Rol getRolByTblRolIdRol() {
        return rolByTblRolIdRol;
    }

    public void setRolByTblRolIdRol(Rol rolByTblRolIdRol) {
        this.rolByTblRolIdRol = rolByTblRolIdRol;
    }
}
