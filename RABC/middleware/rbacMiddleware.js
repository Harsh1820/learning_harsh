exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : 'anonymous'; // Fetch user's role
    console.log(`User role: ${userRole}`);

    const userPermissions = new Permissions().getPermissionsByRoleName(userRole); // Fetch permissions
    console.log(`User permissions: ${userPermissions}`);

    if (userPermissions && userPermissions.includes(permission)) {
      console.log(`Permission granted for: ${permission}`);
      return next(); 
    } else {
      console.log(`Permission denied for: ${permission}`);
      return res.status(403).json({ error: 'Access denied' }); // Permission denied
    }
  };
};
