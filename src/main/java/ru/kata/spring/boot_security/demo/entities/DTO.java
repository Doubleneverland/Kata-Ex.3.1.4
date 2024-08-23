package ru.kata.spring.boot_security.demo.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import java.util.Collection;


public class DTO {

    @JsonProperty("user")
    private User user;

    @JsonProperty("roles")
    private Collection<Role> roles;

    public DTO () {

    }

    public DTO (User user, Collection<Role> roles) {
        this.user = user;
        this.roles = roles;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
