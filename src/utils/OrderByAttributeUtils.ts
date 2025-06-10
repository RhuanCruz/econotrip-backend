const RoleOrderBy: Map<string, string> = new Map();
RoleOrderBy.set('ID', 'role.id');
RoleOrderBy.set('NAME', 'role.name');

const PermissionOrderBy: Map<string, string> = new Map();
PermissionOrderBy.set('ID', 'permission.id');
PermissionOrderBy.set('NAME', 'permission.name');

const UserOrderBy: Map<string, string> = new Map();
UserOrderBy.set('ID', 'user.id');
UserOrderBy.set('NAME', 'user.fullname');

export { RoleOrderBy, PermissionOrderBy, UserOrderBy };
