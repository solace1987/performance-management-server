//handle email or usename duplicates
const errorCtrl = (err, res) => {
    if (err.code && err.code == 11000) {

        const field = Object.keys(err.keyValue);
        const code = 409;
        const error = `An account with that ${field} already exists.`;
        res.status(code).send({ error: error, fields: field });

    }

    if(err.name === 'ValidationError'){
        let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;

    if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({error: formattedErrors, fields: fields});
    } else {
        res.status(code).send({error: errors, fields: fields})
    }

    }

}


export default errorCtrl;