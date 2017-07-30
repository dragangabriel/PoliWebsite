package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.LeagueTable;

import com.mycompany.myapp.repository.LeagueTableRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing LeagueTable.
 */
@RestController
@RequestMapping("/api")
public class LeagueTableResource {

    private final Logger log = LoggerFactory.getLogger(LeagueTableResource.class);

    private static final String ENTITY_NAME = "leagueTable";

    private final LeagueTableRepository leagueTableRepository;

    public LeagueTableResource(LeagueTableRepository leagueTableRepository) {
        this.leagueTableRepository = leagueTableRepository;
    }

    /**
     * POST  /league-tables : Create a new leagueTable.
     *
     * @param leagueTable the leagueTable to create
     * @return the ResponseEntity with status 201 (Created) and with body the new leagueTable, or with status 400 (Bad Request) if the leagueTable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/league-tables")
    @Timed
    public ResponseEntity<LeagueTable> createLeagueTable(@Valid @RequestBody LeagueTable leagueTable) throws URISyntaxException {
        log.debug("REST request to save LeagueTable : {}", leagueTable);
        if (leagueTable.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new leagueTable cannot already have an ID")).body(null);
        }
        LeagueTable result = leagueTableRepository.save(leagueTable);
        return ResponseEntity.created(new URI("/api/league-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /league-tables : Updates an existing leagueTable.
     *
     * @param leagueTable the leagueTable to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated leagueTable,
     * or with status 400 (Bad Request) if the leagueTable is not valid,
     * or with status 500 (Internal Server Error) if the leagueTable couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/league-tables")
    @Timed
    public ResponseEntity<LeagueTable> updateLeagueTable(@Valid @RequestBody LeagueTable leagueTable) throws URISyntaxException {
        log.debug("REST request to update LeagueTable : {}", leagueTable);
        if (leagueTable.getId() == null) {
            return createLeagueTable(leagueTable);
        }
        LeagueTable result = leagueTableRepository.save(leagueTable);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, leagueTable.getId().toString()))
            .body(result);
    }

    /**
     * GET  /league-tables : get all the leagueTables.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of leagueTables in body
     */
    @GetMapping("/league-tables")
    @Timed
    public ResponseEntity<List<LeagueTable>> getAllLeagueTables(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of LeagueTables");
        Page<LeagueTable> page = leagueTableRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/league-tables");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /league-tables/:id : get the "id" leagueTable.
     *
     * @param id the id of the leagueTable to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the leagueTable, or with status 404 (Not Found)
     */
    @GetMapping("/league-tables/{id}")
    @Timed
    public ResponseEntity<LeagueTable> getLeagueTable(@PathVariable Long id) {
        log.debug("REST request to get LeagueTable : {}", id);
        LeagueTable leagueTable = leagueTableRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(leagueTable));
    }

    /**
     * DELETE  /league-tables/:id : delete the "id" leagueTable.
     *
     * @param id the id of the leagueTable to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/league-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteLeagueTable(@PathVariable Long id) {
        log.debug("REST request to delete LeagueTable : {}", id);
        leagueTableRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
