import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import parsePhoneNumberFromString from 'libphonenumber-js/max';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private formatPhoneNumber(phone: string): string {
    const phoneNumber = parsePhoneNumberFromString(phone, 'RU');
    return phoneNumber?.formatInternational() || phone;
  }
  private capitalizeFirstLetter(str: string): string {
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  private formatFullName(
    firstName: string,
    lastName: string,
    middleName: string = '',
  ) {
    return {
      formattedFirstName: this.capitalizeFirstLetter(firstName),
      formattedLastName: this.capitalizeFirstLetter(lastName),
      formattedMiddleName: this.capitalizeFirstLetter(middleName),
    };
  }
  async create(dto: CreateUserDto) {
    const { formattedFirstName, formattedLastName, formattedMiddleName } =
      this.formatFullName(dto.firstName, dto.lastName, dto.middleName ?? '');
    const formattedDto = {
      ...dto,
      firstName: formattedFirstName,
      lastName: formattedLastName,
      middleName: formattedMiddleName,
      phone: this.formatPhoneNumber(dto.phone),
    };
    console.log('user-service');
    return this.prisma.user.create({ data: { ...formattedDto } });
  }
  async getAll() {
    return this.prisma.user.findMany();
  }

  async getByName(userParam: string) {
    const nameParts = userParam.trim().split(/\s+/);

    const searchConditions = nameParts.map((part) => ({
      OR: [
        {
          firstName: {
            contains: part,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
        {
          lastName: { 
            contains: part, 
            mode: 'insensitive' as Prisma.QueryMode
          },
        },
        {
          middleName: {
            contains: part,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
      ],
    }));
    return this.prisma.user.findMany({
      where: {
        AND: searchConditions,
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        middleName: true,
        phone: true,
        email: true,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const formattedData: Partial<UpdateUserDto> = { ...dto };

    if (dto.firstName) {
      formattedData.firstName = this.capitalizeFirstLetter(dto.firstName);
    }
    if (dto.lastName) {
      formattedData.lastName = this.capitalizeFirstLetter(dto.lastName);
    }
    if (dto.middleName) {
      formattedData.middleName = this.capitalizeFirstLetter(dto.middleName);
    }
    if (dto.phone) {
      formattedData.phone = this.formatPhoneNumber(dto.phone);
    }

    return this.prisma.user.update({
      where: { id },
      data: formattedData,
    });
  }
  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    
    return user;
  }
}
