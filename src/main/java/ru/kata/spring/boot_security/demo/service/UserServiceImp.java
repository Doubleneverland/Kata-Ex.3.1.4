package ru.kata.spring.boot_security.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;

import javax.annotation.PostConstruct;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImp implements UserService {


    private final UserDao userDao;

    private final RoleDao roleDao;
    public UserServiceImp(UserDao userDao, RoleDao roleDao) {this.userDao = userDao;

        this.roleDao = roleDao;
    }

    @PostConstruct
    public void firstUser() {

        Set<Role> roles = new HashSet<>();
        Role adminRole = new Role("ROLE_ADMIN");
        roles.add(adminRole);
        Role userRole = new Role("ROLE_USER");
        roles.add(userRole);
        roleDao.saveRole(adminRole);
        roleDao.saveRole(userRole);


        User admin = new User("admin", "admin", 25L, "admin@mail.ru", "admin", new HashSet<>());
        admin.getRoles().add(roleDao.getRoleByName("ROLE_ADMIN"));
        userDao.save(admin);

        User user = new User("user", "user", 34L, "user@mail.ru", "user", new HashSet<>());
        user.getRoles().add(roleDao.getRoleByName("ROLE_USER"));
        userDao.save(user);

        User user1 = new User("user1", "user1", 45L, "user1@mail.ru", "user1", roles);
        userDao.save(user1);

    }

    @Override
    public void save(User user) {
        userDao.save(user);
    }

    @Override
    public void create(User user, Collection<Long> selectRole) {
        userDao.create(user, selectRole);
    }

    @Override
    public void createUser(User user, Collection<Role> roles) {
        userDao.createUser(user, roles);
    }

    @Override
    @Transactional
    public List<User> read() {
        return userDao.read();
    }



    @Override
    @Transactional
    public User getUserByName(String name) { return userDao.getUserByName(name);
    }

    @Override
    @Transactional
    public void delete(long id) {
        userDao.delete(id);
    }



    @Override
    @Transactional
    public User update(User user, Collection<Role> role) {
        return userDao.update(user, role);
    }


    @Override
    public User upPage(long id) {
        return userDao.upPage(id);
    }



}
