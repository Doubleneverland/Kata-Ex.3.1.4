package ru.kata.spring.boot_security.demo.dao;




import org.springframework.http.ResponseEntity;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.Collection;
import java.util.List;

public interface UserDao {


    void save(User user);

    List<User> read();




    User update(User user, Collection<Role> role);


    void delete(long id);

    User getUserByName(String name);

    User upPage(long id);

    void create(User user, Collection<Long> selectRole);

    void createUser(User user, Collection<Role> roles);

}
