package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LeagueTable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LeagueTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LeagueTableRepository extends JpaRepository<LeagueTable,Long> {
    
}
