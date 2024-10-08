package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entities.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Collection;
import java.util.List;

@Repository
public class RoleDaoImp implements RoleDao{

    @PersistenceContext
    private final EntityManager entityManager;

    public RoleDaoImp(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void saveRole(Role role) {
        entityManager.persist(role);
    }

    public Collection<Role> getAllRoles() {
        return entityManager.createQuery("from Role").getResultList();

    }

    @Override
    @Transactional
    public Role getRoleByName(String roleName) {
        List<Role> role =
                entityManager.createQuery("SELECT u FROM Role u where u.role = :userRole", Role.class)
                        .setParameter("userRole", roleName).getResultList();
        if (!role.isEmpty()) {
            return role.get(0);
        }
        return null;
    }

    @Override
    public Collection<Role> getRoleById(Collection<Long> roleById) {
        TypedQuery<Role> role = null;
        for (Long roleId : roleById) {
                 role = entityManager.createQuery("SELECT r FROM Role r WHERE r.id = :roleId", Role.class)
                            .setParameter("roleId", roleId);
        }

        return role.getResultList();
    }
}
