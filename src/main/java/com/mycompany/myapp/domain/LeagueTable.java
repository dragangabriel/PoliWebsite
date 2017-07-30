package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A LeagueTable.
 */
@Entity
@Table(name = "league_table")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LeagueTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "position", nullable = false)
    private Integer position;

    @NotNull
    @Column(name = "teamname", nullable = false)
    private String teamname;

    @NotNull
    @Column(name = "played", nullable = false)
    private Integer played;

    @NotNull
    @Column(name = "wins", nullable = false)
    private Integer wins;

    @NotNull
    @Column(name = "draws", nullable = false)
    private Integer draws;

    @NotNull
    @Column(name = "losses", nullable = false)
    private Integer losses;

    @NotNull
    @Column(name = "goalsfor", nullable = false)
    private Integer goalsfor;

    @NotNull
    @Column(name = "goalsagainst", nullable = false)
    private Integer goalsagainst;

    @NotNull
    @Column(name = "points", nullable = false)
    private Integer points;

    @ManyToOne
    private Competition leaguetablecompetition;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPosition() {
        return position;
    }

    public LeagueTable position(Integer position) {
        this.position = position;
        return this;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public String getTeamname() {
        return teamname;
    }

    public LeagueTable teamname(String teamname) {
        this.teamname = teamname;
        return this;
    }

    public void setTeamname(String teamname) {
        this.teamname = teamname;
    }

    public Integer getPlayed() {
        return played;
    }

    public LeagueTable played(Integer played) {
        this.played = played;
        return this;
    }

    public void setPlayed(Integer played) {
        this.played = played;
    }

    public Integer getWins() {
        return wins;
    }

    public LeagueTable wins(Integer wins) {
        this.wins = wins;
        return this;
    }

    public void setWins(Integer wins) {
        this.wins = wins;
    }

    public Integer getDraws() {
        return draws;
    }

    public LeagueTable draws(Integer draws) {
        this.draws = draws;
        return this;
    }

    public void setDraws(Integer draws) {
        this.draws = draws;
    }

    public Integer getLosses() {
        return losses;
    }

    public LeagueTable losses(Integer losses) {
        this.losses = losses;
        return this;
    }

    public void setLosses(Integer losses) {
        this.losses = losses;
    }

    public Integer getGoalsfor() {
        return goalsfor;
    }

    public LeagueTable goalsfor(Integer goalsfor) {
        this.goalsfor = goalsfor;
        return this;
    }

    public void setGoalsfor(Integer goalsfor) {
        this.goalsfor = goalsfor;
    }

    public Integer getGoalsagainst() {
        return goalsagainst;
    }

    public LeagueTable goalsagainst(Integer goalsagainst) {
        this.goalsagainst = goalsagainst;
        return this;
    }

    public void setGoalsagainst(Integer goalsagainst) {
        this.goalsagainst = goalsagainst;
    }

    public Integer getPoints() {
        return points;
    }

    public LeagueTable points(Integer points) {
        this.points = points;
        return this;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Competition getLeaguetablecompetition() {
        return leaguetablecompetition;
    }

    public LeagueTable leaguetablecompetition(Competition competition) {
        this.leaguetablecompetition = competition;
        return this;
    }

    public void setLeaguetablecompetition(Competition competition) {
        this.leaguetablecompetition = competition;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LeagueTable leagueTable = (LeagueTable) o;
        if (leagueTable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), leagueTable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LeagueTable{" +
            "id=" + getId() +
            ", position='" + getPosition() + "'" +
            ", teamname='" + getTeamname() + "'" +
            ", played='" + getPlayed() + "'" +
            ", wins='" + getWins() + "'" +
            ", draws='" + getDraws() + "'" +
            ", losses='" + getLosses() + "'" +
            ", goalsfor='" + getGoalsfor() + "'" +
            ", goalsagainst='" + getGoalsagainst() + "'" +
            ", points='" + getPoints() + "'" +
            "}";
    }
}
