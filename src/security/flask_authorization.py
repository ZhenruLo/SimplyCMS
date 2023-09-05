from flask_principal import Permission, Principal, RoleNeed

principals = Principal()
admin_permission = Permission(RoleNeed('admin'))
