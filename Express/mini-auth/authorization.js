export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        next();
    }
}

// router.delete("/users/:id", authenticate, authorize('admin'), deletedUser);
// router.delete("/reports", authenticate, authorize('admin', 'manager'), deletedUser);


// if (req.user.userid !== req.params.id) {
//     return res.status(403);
// }

