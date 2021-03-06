import { Request, Response } from 'express';
import Users from '../Model/users';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mailer from '../../Modules/mailer';
import generateToken from '../../Utils/generateToken';


interface indexRequest extends Request {
    userId: number;
}

const now = new Date;
export default class UsersController {
    async index(req: indexRequest, res: Response) {
        try {
            const user = await Users.findOne({ _id: req.userId });
            if (!user) {
                return res.status(401).json({
                    error: 'not found user',
                });
            }

            if (!user.id) {
                return res.status(400).json({
                    error: 'User Id not found',
                });
            }

            return res.status(200).send({
                ok: true,
                user,
            });
        } catch (err) {
            return res.status(400).json({
                error: 'Failed to find user',
            });
        }
    }

    async forgot_password(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }

            const token = crypto.randomBytes(20).toString('hex');


            now.setHours(now.getHours() + 1);

            await Users.findOneAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            mailer.sendMail({
                to: email,
                from: process.env.NODEMAILER_USER,
                template: 'auth/forgot_password',
                context: { token }
            }, (err: any) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        error: 'Failed to send email'
                    });
                } else {
                    res.status(201).send('Sucess send email');
                }
            });
        } catch (err) {
            return res.status(401).json({
                error: `Failed on forgot password ${err}`
            });
        }
    }

    async reset_password(req: Request, res: Response) {
        const { email, token, password } = req.body;

        try {
            const user = await Users.findOne({ email })
                .select('+passwordResetToken passwordResetExpires')
            if (!user) {
                return res.status(401).json({
                    error: 'User not found',
                });
            }

            if (token !== user.passwordResetToken) {
                return res.status(400).json({
                    error: 'Invalid Token'
                });
            }

            if (now > user.passwordResetExpires) {
                return res.status(400).json({
                    error: 'Token expires, generate a new one',
                });
            }

            user.password = password;

            await user.save({})

            return res.status(200).send('Sucess to reset a new password');
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Failed to reset password',
            });
        }
    }

    async auth(req: Request, res: Response) {
        const {
            email,
            password
        } = req.body

        const user = await Users.findOne({ email }).select(`+password`);

        if (!user) {
            res.status(400).json({
                error: 'Usuário não encontrado',
            });
        }

        if (!await bcrypt.compare(password, user.password)) {
            res.status(400).json({
                error: 'Senha invalida'
            })
        }

        user.password = undefined;
        res.send({
            user,
            token: generateToken({ id: user?.id }),
        });
    }

    async create(req: Request, res: Response) {
        const {
            name,
            surname,
            email,
            password,
        } = req.body;

        const users = new Users({
            name,
            surname,
            email,
            password,
        });

        try {
            if (await Users.findOne({ email }))
                return res.status(400).json({
                    error: 'Email existente'
                });
            await users.save();
            users.password = undefined;
            mailer.sendMail({
                to: email,
                from: process.env.NODEMAILER_USER,
                template: 'create/new_user',
                context: { name },
            }, (err: any) => {
                if (err)
                    return res.status(400).json({
                        error: `Falha ao enviar email ${err}`,
                    });
                else
                    return res.status(201).send({
                        status: 'Okay, Email enviado para usuário',
                        users,
                        token: generateToken({ id: users.id }),
                    });
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: `Falha ao enviar dados de usuário: ${err}`
            });
        }
    }
}