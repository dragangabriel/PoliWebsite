package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Match.
 */
@Entity
@Table(name = "jhi_match")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Match implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "hometeam", nullable = false)
    private String hometeam;

    @NotNull
    @Column(name = "awayteam", nullable = false)
    private String awayteam;

    @Column(name = "homegoals")
    private Integer homegoals;

    @Column(name = "awaygoals")
    private Integer awaygoals;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "matchdatetime", nullable = false)
    private ZonedDateTime matchdatetime;

    @ManyToOne(optional = false)
    @NotNull
    private Competition matchcompetition;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHometeam() {
        return hometeam;
    }

    public Match hometeam(String hometeam) {
        this.hometeam = hometeam;
        return this;
    }

    public void setHometeam(String hometeam) {
        this.hometeam = hometeam;
    }

    public String getAwayteam() {
        return awayteam;
    }

    public Match awayteam(String awayteam) {
        this.awayteam = awayteam;
        return this;
    }

    public void setAwayteam(String awayteam) {
        this.awayteam = awayteam;
    }

    public Integer getHomegoals() {
        return homegoals;
    }

    public Match homegoals(Integer homegoals) {
        this.homegoals = homegoals;
        return this;
    }

    public void setHomegoals(Integer homegoals) {
        this.homegoals = homegoals;
    }

    public Integer getAwaygoals() {
        return awaygoals;
    }

    public Match awaygoals(Integer awaygoals) {
        this.awaygoals = awaygoals;
        return this;
    }

    public void setAwaygoals(Integer awaygoals) {
        this.awaygoals = awaygoals;
    }

    public String getLocation() {
        return location;
    }

    public Match location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public Match description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getMatchdatetime() {
        return matchdatetime;
    }

    public Match matchdatetime(ZonedDateTime matchdatetime) {
        this.matchdatetime = matchdatetime;
        return this;
    }

    public void setMatchdatetime(ZonedDateTime matchdatetime) {
        this.matchdatetime = matchdatetime;
    }

    public Competition getMatchcompetition() {
        return matchcompetition;
    }

    public Match matchcompetition(Competition competition) {
        this.matchcompetition = competition;
        return this;
    }

    public void setMatchcompetition(Competition competition) {
        this.matchcompetition = competition;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Match match = (Match) o;
        if (match.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), match.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Match{" +
            "id=" + getId() +
            ", hometeam='" + getHometeam() + "'" +
            ", awayteam='" + getAwayteam() + "'" +
            ", homegoals='" + getHomegoals() + "'" +
            ", awaygoals='" + getAwaygoals() + "'" +
            ", location='" + getLocation() + "'" +
            ", description='" + getDescription() + "'" +
            ", matchdatetime='" + getMatchdatetime() + "'" +
            "}";
    }
}
