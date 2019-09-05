module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = (req, res) => {
        const type = { ...req.body }
        if(req.params.id) type.id = req.params.id

        try {
            existsOrError(type.tipo, 'Tipo não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(type.id) {
            app.db('tipos')
            .update(type)
            .where({ id: type.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else {
            app.db('tipos')
                .insert(type)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do Tipo não informado')

            const rowsDeleted = await app.db('tipos')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Tipo não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('tipos')
            .select('id', 'tipo')
            .then(types => res.json(types))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get }

}