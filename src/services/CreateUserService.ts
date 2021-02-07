import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: RequestDTO): Promise<User> {
        const userRepository = getRepository(User);

        if (
            await userRepository.findOne({
                where: { email },
            })
        )
            throw Error('Email already registered');

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
