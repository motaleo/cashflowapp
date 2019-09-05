module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = (req, res) => {
        const empresa = { ...req.body }
        if(req.params.id) empresa.id = req.params.id

        try {
            existsOrError(empresa.tipo, 'Empresa não informada')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(empresa.id) {
            app.db('empresas')
            .update(empresa)
            .where({ id: empresa.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else {
            app.db('empresas')
                .insert(empresa)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Empresa não informado')

            const rowsDeleted = await app.db('empresas')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Empresa não encontrada')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('empresas')
            .select('id', 'name')
            .then(cia => res.json(cia))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get }
}