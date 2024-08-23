package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.DTO;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminControllerRest {

    private final UserService userService;
    private final RoleService roleService;


    public AdminControllerRest(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;

    }


    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        //List<User> list = userService.read();
        return new ResponseEntity<>(userService.read(), HttpStatus.OK);
    }

    @GetMapping("/auth")
    public User authUser(@AuthenticationPrincipal User user) {
        return user;
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> UserById(@PathVariable long id) {
        return new ResponseEntity<>(userService.upPage(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody DTO dto) {
        userService.createUser(dto.getUser(), dto.getRoles());
        return new ResponseEntity<>(dto.getUser(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody DTO dto) {

        //User upUser = userService.update(dto.getUser(), dto.getRoles());
        return new ResponseEntity<>(userService.update(dto.getUser(), dto.getRoles()), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.delete(id);
    }

    @GetMapping("/roles")
    public ResponseEntity<Collection<Role>> getAllRoles() {
        //Collection<Role> roles = roleService.getAllRoles();
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

}
