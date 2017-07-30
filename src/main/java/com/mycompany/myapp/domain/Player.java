package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Player.
 */
@Entity
@Table(name = "player")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Player implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fullname", nullable = false)
    private String fullname;

    @NotNull
    @Column(name = "priority", nullable = false)
    private Integer priority;

    @NotNull
    @Column(name = "dateofbirth", nullable = false)
    private LocalDate dateofbirth;

    @NotNull
    @Column(name = "shirtno", nullable = false)
    private Integer shirtno;

    @Column(name = "previousclubs")
    private String previousclubs;

    @Column(name = "placeofbirth")
    private String placeofbirth;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @ManyToOne(optional = false)
    @NotNull
    private Position playerposition;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public Player fullname(String fullname) {
        this.fullname = fullname;
        return this;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public Integer getPriority() {
        return priority;
    }

    public Player priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public LocalDate getDateofbirth() {
        return dateofbirth;
    }

    public Player dateofbirth(LocalDate dateofbirth) {
        this.dateofbirth = dateofbirth;
        return this;
    }

    public void setDateofbirth(LocalDate dateofbirth) {
        this.dateofbirth = dateofbirth;
    }

    public Integer getShirtno() {
        return shirtno;
    }

    public Player shirtno(Integer shirtno) {
        this.shirtno = shirtno;
        return this;
    }

    public void setShirtno(Integer shirtno) {
        this.shirtno = shirtno;
    }

    public String getPreviousclubs() {
        return previousclubs;
    }

    public Player previousclubs(String previousclubs) {
        this.previousclubs = previousclubs;
        return this;
    }

    public void setPreviousclubs(String previousclubs) {
        this.previousclubs = previousclubs;
    }

    public String getPlaceofbirth() {
        return placeofbirth;
    }

    public Player placeofbirth(String placeofbirth) {
        this.placeofbirth = placeofbirth;
        return this;
    }

    public void setPlaceofbirth(String placeofbirth) {
        this.placeofbirth = placeofbirth;
    }

    public byte[] getImage() {
        return image;
    }

    public Player image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Player imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Position getPlayerposition() {
        return playerposition;
    }

    public Player playerposition(Position position) {
        this.playerposition = position;
        return this;
    }

    public void setPlayerposition(Position position) {
        this.playerposition = position;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Player player = (Player) o;
        if (player.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), player.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Player{" +
            "id=" + getId() +
            ", fullname='" + getFullname() + "'" +
            ", priority='" + getPriority() + "'" +
            ", dateofbirth='" + getDateofbirth() + "'" +
            ", shirtno='" + getShirtno() + "'" +
            ", previousclubs='" + getPreviousclubs() + "'" +
            ", placeofbirth='" + getPlaceofbirth() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + imageContentType + "'" +
            "}";
    }
}
