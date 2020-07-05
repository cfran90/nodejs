INSERT INTO permissions (name, description, type_class, created_at, updated_at) VALUES
('PERM_ADMIN_USERS', 'Permite realizar qualquer ação no cadastro de usuários.', 'USERS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO permissions (name, description, type_class, created_at, updated_at) VALUES
('PERM_SAVE_USERS', 'Permite cadastrar usuários', 'USERS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO groups ("name", description, created_at, updated_at) VALUES
('Admin', 'Grupo administrador', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO groups ("name", description, created_at, updated_at) VALUES
('Radiologista', 'Grupo radiologista', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO groups_permissions (group_id, permission_id, created_at, updated_at) VALUES
(1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO groups_permissions (group_id, permission_id, created_at, updated_at) VALUES
(1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO groups_permissions (group_id, permission_id, created_at, updated_at) VALUES
(2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO users_groups (user_id, group_id, created_at, updated_at) VALUES
(1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO users_groups (user_id, group_id, created_at, updated_at) VALUES
(1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO users_groups (user_id, group_id, created_at, updated_at) VALUES
(2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
