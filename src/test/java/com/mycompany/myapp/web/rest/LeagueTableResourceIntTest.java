package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.PoliApp;

import com.mycompany.myapp.domain.LeagueTable;
import com.mycompany.myapp.repository.LeagueTableRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LeagueTableResource REST controller.
 *
 * @see LeagueTableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PoliApp.class)
public class LeagueTableResourceIntTest {

    private static final Integer DEFAULT_POSITION = 1;
    private static final Integer UPDATED_POSITION = 2;

    private static final String DEFAULT_TEAMNAME = "AAAAAAAAAA";
    private static final String UPDATED_TEAMNAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PLAYED = 1;
    private static final Integer UPDATED_PLAYED = 2;

    private static final Integer DEFAULT_WINS = 1;
    private static final Integer UPDATED_WINS = 2;

    private static final Integer DEFAULT_DRAWS = 1;
    private static final Integer UPDATED_DRAWS = 2;

    private static final Integer DEFAULT_LOSSES = 1;
    private static final Integer UPDATED_LOSSES = 2;

    private static final Integer DEFAULT_GOALSFOR = 1;
    private static final Integer UPDATED_GOALSFOR = 2;

    private static final Integer DEFAULT_GOALSAGAINST = 1;
    private static final Integer UPDATED_GOALSAGAINST = 2;

    private static final Integer DEFAULT_POINTS = 1;
    private static final Integer UPDATED_POINTS = 2;

    @Autowired
    private LeagueTableRepository leagueTableRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLeagueTableMockMvc;

    private LeagueTable leagueTable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        LeagueTableResource leagueTableResource = new LeagueTableResource(leagueTableRepository);
        this.restLeagueTableMockMvc = MockMvcBuilders.standaloneSetup(leagueTableResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LeagueTable createEntity(EntityManager em) {
        LeagueTable leagueTable = new LeagueTable()
            .position(DEFAULT_POSITION)
            .teamname(DEFAULT_TEAMNAME)
            .played(DEFAULT_PLAYED)
            .wins(DEFAULT_WINS)
            .draws(DEFAULT_DRAWS)
            .losses(DEFAULT_LOSSES)
            .goalsfor(DEFAULT_GOALSFOR)
            .goalsagainst(DEFAULT_GOALSAGAINST)
            .points(DEFAULT_POINTS);
        return leagueTable;
    }

    @Before
    public void initTest() {
        leagueTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createLeagueTable() throws Exception {
        int databaseSizeBeforeCreate = leagueTableRepository.findAll().size();

        // Create the LeagueTable
        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isCreated());

        // Validate the LeagueTable in the database
        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeCreate + 1);
        LeagueTable testLeagueTable = leagueTableList.get(leagueTableList.size() - 1);
        assertThat(testLeagueTable.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testLeagueTable.getTeamname()).isEqualTo(DEFAULT_TEAMNAME);
        assertThat(testLeagueTable.getPlayed()).isEqualTo(DEFAULT_PLAYED);
        assertThat(testLeagueTable.getWins()).isEqualTo(DEFAULT_WINS);
        assertThat(testLeagueTable.getDraws()).isEqualTo(DEFAULT_DRAWS);
        assertThat(testLeagueTable.getLosses()).isEqualTo(DEFAULT_LOSSES);
        assertThat(testLeagueTable.getGoalsfor()).isEqualTo(DEFAULT_GOALSFOR);
        assertThat(testLeagueTable.getGoalsagainst()).isEqualTo(DEFAULT_GOALSAGAINST);
        assertThat(testLeagueTable.getPoints()).isEqualTo(DEFAULT_POINTS);
    }

    @Test
    @Transactional
    public void createLeagueTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = leagueTableRepository.findAll().size();

        // Create the LeagueTable with an existing ID
        leagueTable.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setPosition(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTeamnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setTeamname(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlayedIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setPlayed(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWinsIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setWins(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDrawsIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setDraws(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLossesIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setLosses(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGoalsforIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setGoalsfor(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGoalsagainstIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setGoalsagainst(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPointsIsRequired() throws Exception {
        int databaseSizeBeforeTest = leagueTableRepository.findAll().size();
        // set the field null
        leagueTable.setPoints(null);

        // Create the LeagueTable, which fails.

        restLeagueTableMockMvc.perform(post("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isBadRequest());

        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLeagueTables() throws Exception {
        // Initialize the database
        leagueTableRepository.saveAndFlush(leagueTable);

        // Get all the leagueTableList
        restLeagueTableMockMvc.perform(get("/api/league-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leagueTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
            .andExpect(jsonPath("$.[*].teamname").value(hasItem(DEFAULT_TEAMNAME.toString())))
            .andExpect(jsonPath("$.[*].played").value(hasItem(DEFAULT_PLAYED)))
            .andExpect(jsonPath("$.[*].wins").value(hasItem(DEFAULT_WINS)))
            .andExpect(jsonPath("$.[*].draws").value(hasItem(DEFAULT_DRAWS)))
            .andExpect(jsonPath("$.[*].losses").value(hasItem(DEFAULT_LOSSES)))
            .andExpect(jsonPath("$.[*].goalsfor").value(hasItem(DEFAULT_GOALSFOR)))
            .andExpect(jsonPath("$.[*].goalsagainst").value(hasItem(DEFAULT_GOALSAGAINST)))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)));
    }

    @Test
    @Transactional
    public void getLeagueTable() throws Exception {
        // Initialize the database
        leagueTableRepository.saveAndFlush(leagueTable);

        // Get the leagueTable
        restLeagueTableMockMvc.perform(get("/api/league-tables/{id}", leagueTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(leagueTable.getId().intValue()))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION))
            .andExpect(jsonPath("$.teamname").value(DEFAULT_TEAMNAME.toString()))
            .andExpect(jsonPath("$.played").value(DEFAULT_PLAYED))
            .andExpect(jsonPath("$.wins").value(DEFAULT_WINS))
            .andExpect(jsonPath("$.draws").value(DEFAULT_DRAWS))
            .andExpect(jsonPath("$.losses").value(DEFAULT_LOSSES))
            .andExpect(jsonPath("$.goalsfor").value(DEFAULT_GOALSFOR))
            .andExpect(jsonPath("$.goalsagainst").value(DEFAULT_GOALSAGAINST))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS));
    }

    @Test
    @Transactional
    public void getNonExistingLeagueTable() throws Exception {
        // Get the leagueTable
        restLeagueTableMockMvc.perform(get("/api/league-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLeagueTable() throws Exception {
        // Initialize the database
        leagueTableRepository.saveAndFlush(leagueTable);
        int databaseSizeBeforeUpdate = leagueTableRepository.findAll().size();

        // Update the leagueTable
        LeagueTable updatedLeagueTable = leagueTableRepository.findOne(leagueTable.getId());
        updatedLeagueTable
            .position(UPDATED_POSITION)
            .teamname(UPDATED_TEAMNAME)
            .played(UPDATED_PLAYED)
            .wins(UPDATED_WINS)
            .draws(UPDATED_DRAWS)
            .losses(UPDATED_LOSSES)
            .goalsfor(UPDATED_GOALSFOR)
            .goalsagainst(UPDATED_GOALSAGAINST)
            .points(UPDATED_POINTS);

        restLeagueTableMockMvc.perform(put("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLeagueTable)))
            .andExpect(status().isOk());

        // Validate the LeagueTable in the database
        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeUpdate);
        LeagueTable testLeagueTable = leagueTableList.get(leagueTableList.size() - 1);
        assertThat(testLeagueTable.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testLeagueTable.getTeamname()).isEqualTo(UPDATED_TEAMNAME);
        assertThat(testLeagueTable.getPlayed()).isEqualTo(UPDATED_PLAYED);
        assertThat(testLeagueTable.getWins()).isEqualTo(UPDATED_WINS);
        assertThat(testLeagueTable.getDraws()).isEqualTo(UPDATED_DRAWS);
        assertThat(testLeagueTable.getLosses()).isEqualTo(UPDATED_LOSSES);
        assertThat(testLeagueTable.getGoalsfor()).isEqualTo(UPDATED_GOALSFOR);
        assertThat(testLeagueTable.getGoalsagainst()).isEqualTo(UPDATED_GOALSAGAINST);
        assertThat(testLeagueTable.getPoints()).isEqualTo(UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void updateNonExistingLeagueTable() throws Exception {
        int databaseSizeBeforeUpdate = leagueTableRepository.findAll().size();

        // Create the LeagueTable

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLeagueTableMockMvc.perform(put("/api/league-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leagueTable)))
            .andExpect(status().isCreated());

        // Validate the LeagueTable in the database
        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLeagueTable() throws Exception {
        // Initialize the database
        leagueTableRepository.saveAndFlush(leagueTable);
        int databaseSizeBeforeDelete = leagueTableRepository.findAll().size();

        // Get the leagueTable
        restLeagueTableMockMvc.perform(delete("/api/league-tables/{id}", leagueTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LeagueTable> leagueTableList = leagueTableRepository.findAll();
        assertThat(leagueTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LeagueTable.class);
        LeagueTable leagueTable1 = new LeagueTable();
        leagueTable1.setId(1L);
        LeagueTable leagueTable2 = new LeagueTable();
        leagueTable2.setId(leagueTable1.getId());
        assertThat(leagueTable1).isEqualTo(leagueTable2);
        leagueTable2.setId(2L);
        assertThat(leagueTable1).isNotEqualTo(leagueTable2);
        leagueTable1.setId(null);
        assertThat(leagueTable1).isNotEqualTo(leagueTable2);
    }
}
