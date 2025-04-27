import { request, response } from "express";

//Valida especificamente que el usuario tenga ADMIN_ROLE
const validateAdminRole = (req = request, res = response, next) => {
    if (!req.userFromToken) {
        return res.status(500).json({
            msg: 'Se intenta verificar el role sin validar el token'
        });
    }
    const { role, userName } = req.userFromToken;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Accion denegada. ${userName} no es un administrador`
        })
    }
    next();
}

//Verifica que el usuario tenga alguno de los roles que mando en los argumentos
const validateRole = ( ...roles ) => {
    return (req = request, res = response, next) => {
        //Verificar que tengo un usuario valido del token
        if (!req.userFromToken) {
            return res.status(500).json({
                msg: 'Se intenta verificar el role sin validar el token'
            });
        }

        if (!roles.includes(req.userFromToken.role) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next();
    }
}

export {
    validateAdminRole,
    validateRole
}