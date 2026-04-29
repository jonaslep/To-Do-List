import db from '../database/db.js';


export const getTasks = (req, res) => {

    db.all(
        'SELECT * FROM tasks',
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);

        }
    );

};



export const createTask = (req, res) => {

    const { title } = req.body;

    db.run(
        'INSERT INTO tasks(title) VALUES(?)',
        [title],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                id: this.lastID,
                title
            });

        }
    );

};



export const updateTask = (req, res) => {

    const { id } = req.params;

    db.run(
        `UPDATE tasks
SET completed=
CASE
WHEN completed=0 THEN 1
ELSE 0
END
WHERE id=?`,
        [id],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Atualizada'
            });

        }
    );

};



export const deleteTask = (req, res) => {

    const { id } = req.params;

    db.run(
        'DELETE FROM tasks WHERE id=?',
        [id],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Removida'
            });

        }
    );

};