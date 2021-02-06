import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    return res.json(await appointmentRepository.find());
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider, date } = req.body;
        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();
        const appointment = await createAppointmentService.execute({
            provider,
            date: parsedDate,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
