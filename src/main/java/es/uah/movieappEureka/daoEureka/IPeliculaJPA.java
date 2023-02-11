package es.uah.movieappEureka.daoEureka;

import es.uah.movieappEureka.modelEureka.Genero;
import es.uah.movieappEureka.modelEureka.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public interface IPeliculaJPA extends JpaRepository<Pelicula, Integer> {
    Set<Pelicula> findByTituloContainingIgnoreCase(String titulo);
//    Genero findPeliculaByGeneros(String genero);
//     Set<Genero> findPeliculaByGenerosContainingIgnoreCase(String generos);
    Set<Genero> findPeliculasByGenerosContainingIgnoreCase(String generos);
    @Modifying
    @Transactional
    @Query(value = "set @search = concat('%', :search, '%'); \n" +
            "select * from movierater.pelicula pe inner join movierater.pais pa ON pa.idPais = pe.tblPais_idPais\n" +
            "left join movierater.pelicula_has_genero pg ON pg.tblPelicula_idPelicula = pe.idPelicula\n" +
            "left join movierater.genero ge On ge.idGenero = pg.tblGenero_idGenero\n" +
            "left join movierater.pelicula_has_director pd ON pd.tblPelicula_idPelicula = pe.idPelicula\n" +
            "left join movierater.director di on di.idDirector = pd.tblDirector_idDirector\n" +
            "left join movierater.pelicula_has_actor pac ON pac.tblPelicula_idPelicula = pe.idPelicula\n" +
            "left join movierater.actor ac ON ac.idActor = pac.tblActor_idActor\n" +
            "where ge.genero like concat('%', @search, '%')\n" +
            "    or di.nombre like concat('%', @search, '%')\n" +
            "    or ac.nombre and ac.apellidos like concat('%', @search, '%')\n" +
            "    or pe.titulo like concat('%', @search, '%')", nativeQuery=true
    )
    Set<Pelicula> findPeliculaByGenerosContainsIgnoreCaseOrDirectorsContainingIgnoreCaseOrActorsContainingIgnoreCaseOrTituloContainsIgnoreCase(String search);

    //Set<Pelicula> findPeliculaByCustomQuery(@Param("search") String search);


    //Director findPeliculaByDirectorsContainingIgnoreCase(String director);



    //Set<Director> findPeliculaByDirectorsContainingIgnoreCase(String director);
    //Actor findPeliculaByActorsContainingIgnoreCase(String actor);
    //Genero findPeliculaByGeneros(String genero);
    //Director findPeliculaByDirectors(String director);
    //Set<Pelicula>  findPeliculaByActorsContainingIgnoreCaseOrDirectorsContainingIgnoreCaseOrGenerosContainingIgnoreCaseOrTituloContainingIgnoreCase(String actor, String director, String genero, String titulo);
}