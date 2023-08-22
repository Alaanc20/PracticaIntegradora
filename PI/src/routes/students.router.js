import { Router } from 'express';

import StudentService from '../services/db/students.service.js';

const router = Router();
const studentService = new StudentService();

router.get('/', async (req, res) => {
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    }

})

router.post('/', async (req, res) => {
    try {
        let {name, lastName, age, courses } = req.body;
        const nuevoEstudiante = {name, lastName, age, courses};
        studentService.save(nuevoEstudiante)
        res.status(201).send({ result: 'success', payload: nuevoEstudiante })
    } catch (error) {
        console.error("No se pudo crear estudiante con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear estudiante con moongose", message: error });
    }

})

export default router;