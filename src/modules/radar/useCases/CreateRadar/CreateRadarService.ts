import { Body, Post, Route, Tags, Security, OperationId, Request } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { Request as ExpressRequest } from 'express';
import { inject, injectable } from 'inversify';
import { Radar } from '@prisma/client';

import { CreateRadarType } from './CreateRadarSchema';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';
import IRadarRoutineProvider from '@src/common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';
import { IMessageRepository } from '@common/providers/MessageProvider/repositories/IMessageRepository';
import IUserRepository from '@src/modules/user/repositories/IUserRepository';
import { AppError, Errors } from '@src/common/errors';

@injectable()
@Route('radars')
@Tags('Radar')
class CreateRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @inject(Types.RadarRoutineProvider) private radarRoutineProvider: IRadarRoutineProvider;

  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @inject(Types.MessageProvider) private messageRepository: IMessageRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('create_radar')
  public async execute(@Body() data: CreateRadarType, @Request() req: ExpressRequest): Promise<Radar> {
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);

    const radar = await this.radarRepository.create({
      userId: req.auth.user,
      start: data.start,
      end: data.end,
      origin: data.origin,
      destination: data.destination,
      type: data.type,
      value: data.value,
    });

    const origins = data.origin.split(',');
    const destinations = data.destination.split(',');

    origins.forEach(async (origin) => {
      destinations.forEach(async (destination) => {
        await this.radarRoutineProvider.create({
          origin,
          destination,
          type: data.type,
        }).catch(() => {
          console.error('Could not create radar routine');
        });
      });
    });

    const user = await this.userRepository.findById(req.auth.user);
    let userPhone = user?.phone;

    if (userPhone && !userPhone.startsWith('+')) {
      userPhone = `+55${userPhone.replace(/^0+/, '')}`;
    }

    if (user && userPhone) {
      await this.messageRepository.sendSMS({
        to: userPhone,
        message: `[Econotrip] Radar de ${data.origin} para ${data.destination} criado com sucesso! Você receberá notificações por SMS sobre novas ofertas encontradas automaticamente.`,
      }).catch((err) => {
        console.warn('Não foi possível enviar SMS para o usuário:', err);
      });
    }

    return instanceToInstance(radar);
  }
}

export { CreateRadarService };
