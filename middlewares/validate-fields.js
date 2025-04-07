import { request, response } from "express";
import { validationResult } from "express-validator";

const validateFields = (req = request, res = response, next) => {
    //Obtengo los errores de las validaciones desde el middleware de rutas
    const issueValidations = validationResult(req);
    if (!issueValidations.isEmpty()){
        //Si hay errores de validacion reregreso status 400 y el error mapeado
        return res.status(400).json({
            errors: issueValidations.mapped()
        });
    }
    //Si no hay errores continuo con la siguiente validacion
    next();
}

export default validateFields;